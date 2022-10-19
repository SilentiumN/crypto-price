import cryptoCompareServices from "@/services/cryptoCompare.services";

export const cryptoCompareModule = {
    namespaced: true,
    state() {
        return {
            cryptoSubValue: {},
            page: 1,
            activeSubNameGraph: "",
            graph: [],
            countCards: 6,
            filterValue: "",
            windowWidth: 0
        };
    },

    modules: {},

    getters: {
        cryptoSubName(state) {
            return Object.keys(state.cryptoSubValue);
        },
        filteredCryptoSubName(state, getters) {
            return getters.cryptoSubName.filter(subName => {return subName.includes(state.filterValue.toUpperCase())} )
        },
        cryptoSubNameInPage(state, getters) {
            return getters.filteredCryptoSubName.slice(
                0 + (state.page - 1) * state.countCards,
                state.page * state.countCards
            );
        },
        cryptoSubNameVisibleLength(state, getters) {
            return getters.filteredCryptoSubName.slice(0, state.page * state.countCards)
                .length;
        },
        graphAtPercentage(state) {
            if (state.graph.length) {
                const maxValue = Math.max(...state.graph)
                const minValue = Math.min(...state.graph)
                return state.graph.map(value => value != minValue ? ((value - maxValue) / (maxValue - minValue)) * 100 : 0)
            }
            else {
                return []
            }
        },
        maxPage(state, getters) {
            return Math.ceil(getters.cryptoSubName.length / state.countCards)
        }
    },

    mutations: {
        SET_NEW_CRYPTO_SUB_VALUE(state, newSubArray) {
            console.log(newSubArray);
            for (const newSub of newSubArray) {
                state.cryptoSubValue[newSub] = 0;
            }
        },
        DELETE_CRYPTO_SUB_VALUE(state, deleteName) {
            delete state.cryptoSubValue[deleteName];
        },
        UPDATE_CRYPTO_SUB_VALUE(state, updateData) {
            state.cryptoSubValue[updateData.name] = updateData.value;
        },
        INCREMENT_PAGE(state) {
            state.page += 1;
        },
        DECREASE_PAGE(state) {
            state.page -= 1;
        },
        CLEAR_PAGE(state) {
            state.page = 1
        },
        UPDATE_FILTER_VALUE(state, filterValue) {
            state.filterValue = filterValue
        },
        UPDATE_WINDOW_WIDTH(state, windowWidth) {
            state.windowWidth = windowWidth
            console.log(state.windowWidth)
        },
        SET_ACTIVE_SUB_NAME(state, activeGraphName) {
            state.activeSubNameGraph = activeGraphName;
        },
        CLEAR_ACTIVE_SUB_NAME(state) {
            state.activeSubNameGraph = "";
        },
        UPDATE_GRAPH(state, newValue) {
            state.graph.push(newValue)
        },
        CLEAR_GRAPH(state) {
            state.graph = []
        }
    },

    actions: {
        openWebSocket({ state, commit, dispatch, getters }) {
            const webSocket = cryptoCompareServices.openWebSocket(
                process.env.VUE_APP_CRYPTO_COMPARE_API_KEY
            );

            dispatch("getLocalStorage");

            webSocket.onopen = function () {
                dispatch("addNewSub", getters.cryptoSubNameInPage)
            };

            webSocket.onmessage = function onStreamMessage() {
                var message = JSON.parse(event.data);
                console.log(message);

                if (message.TYPE === "5" && message.PRICE) {
                    commit("UPDATE_CRYPTO_SUB_VALUE", {
                        name: message.FROMSYMBOL,
                        value: message.PRICE,
                    });
                    
                    if (message.FROMSYMBOL === state.activeSubNameGraph ) {
                        commit("UPDATE_GRAPH", message.PRICE);
                    }
                } else if (
                    message.TYPE === "500" &&
                    message.MESSAGE === "INVALID_SUB"
                ) {
                    commit(
                        "DELETE_CRYPTO_SUB_VALUE",
                        message.PARAMETER.split("~")[2]
                    );
                } else if (
                    (message.TYPE === "16" &&
                        message.MESSAGE === "SUBSCRIBECOMPLETE") ||
                    (message.TYPE === "17" &&
                        message.MESSAGE === "UNSUBSCRIBECOMPLETE")
                ) {
                    dispatch("setLocalStorage");
                }
            };

            webSocket.onerror = function onError(error) {
                console.log("Error WebSocket: " + error);
            };
        },

        setLocalStorage({ getters }) {
            localStorage.setItem(
                "cryptoSubName",
                JSON.stringify(getters.cryptoSubName)
            );
        },
        getLocalStorage({ commit }) {
            if ("cryptoSubName" in localStorage) {
                const cryptoSubNameLocal = JSON.parse(
                    localStorage.getItem("cryptoSubName")
                );
                if (cryptoSubNameLocal.length) {
                    commit("SET_NEW_CRYPTO_SUB_VALUE", cryptoSubNameLocal);
                }
            }
        },
        addNewSub({ commit }, newSubValueArray) {
            commit("SET_NEW_CRYPTO_SUB_VALUE", newSubValueArray);

            const params = {
                action: "SubAdd",
                subs: [],
            };

            for (const cryptoSubName of newSubValueArray) {
                params.subs.push("5~CCCAGG~" + cryptoSubName + "~USD");
            }
            cryptoCompareServices.sendParamsWebSocket(params);
        },
        deleteSub({ commit, dispatch }, deleteSubValue) {
            cryptoCompareServices.sendParamsWebSocket({
                action: "SubRemove",
                subs: ["5~CCCAGG~" + deleteSubValue + "~USD"],
            });
            commit("DELETE_CRYPTO_SUB_VALUE", deleteSubValue);
            dispatch("clearGraph")
        },
        updatePage({ commit, dispatch, getters }, type) {
            
            if (type === 'increment') {
                commit("INCREMENT_PAGE");
            }
            else if (type === 'decrease') {
                commit("DECREASE_PAGE");
            }
            dispatch("clearWebSocket")
            dispatch("addNewSub", getters.cryptoSubNameInPage)
            dispatch("clearGraph");
        },
        clearWebSocket({state}) {
            const SubNameInPage = Object.keys(state.cryptoSubValue);
            const params = {
                action: "SubRemove",
                subs: [],
            };
            for (const name of SubNameInPage) {
                params.subs.push(
                    "5~CCCAGG~" + name + "~USD"
                );
            }
            cryptoCompareServices.sendParamsWebSocket(params);
        },
        updateFilteredSubName({commit, dispatch, getters}, filterValue) {
            commit("UPDATE_FILTER_VALUE", filterValue)
            dispatch("clearWebSocket")
            dispatch("addNewSub", getters.cryptoSubNameInPage)
            dispatch("clearGraph")
            commit("CLEAR_PAGE")
        },
        setGraph({state, commit, dispatch}, activeGraphName) {
            dispatch("clearGraph");
            commit("UPDATE_GRAPH", state.cryptoSubValue[activeGraphName]);
            commit("SET_ACTIVE_SUB_NAME", activeGraphName);
        },
        clearGraph({commit, state}) {
            commit("CLEAR_ACTIVE_SUB_NAME");
            commit("CLEAR_GRAPH");
            console.log(state)
        },
        updateWindowWidth({commit}, windowWidth) {
            commit("UPDATE_WINDOW_WIDTH", windowWidth)
        }
    },
};
