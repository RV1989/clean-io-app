const { dialog } = require("electron").remote;
const fs = require("fs");
const ioExcel = require('./../utils/ioExcel')
const state = {
  dir: "",
  tagTable:'io',
  data:[],
  outputDir :''
};

const mutations = {
  SET_DIR(state, payload) {
    state.dir = payload;
  },
  SET_DATA(state,payload){
    state.data = payload;
  },
  SET_TAG_TABLE(state,payload){
    state.tagTable = payload;
  },
  SET_OUPUT_DIR(state,payload){
    state.outputDir = payload;
  }


};

const actions = {
  openFileDialog({ dispatch, commit }) {
    dialog.showOpenDialog(
      {
        title: "Open Excel",
        filters: [{ name: "Excel", extensions: ["xlsx"] }],
        properties: ["openFile"]
      },
      filename => {
        if (filename) {
          dispatch("setDirAction", filename);
        } else {
          alert("no file selected");
        }
      }
    );
  },
  saveFileDialog({ dispatch, commit }) {
    dialog.showSaveDialog(
      {
        title: "Open Excel",
        filters: [{ name: "Excel", extensions: ["xlsx"] }],
        properties: ["openFile"]
      },
      filename => {
        if (filename) {
          ioExcel.writeIo(filename,state.data,state.tagTable)
          
        } else {
          alert("File didn't get saved");
        }
      }
    );
  },

  setDirAction({ commit }, payload) {
    commit("SET_DIR", payload);
    commit("SET_DATA",ioExcel.readExcel(payload));

  },
  setTagTable({ commit }, payload) {
    commit("SET_TAG_TABLE", payload);
  
  },
  setOutputDir({ commit }, payload) {
    commit("SET_OUTPUT_DIR", payload);
  
  }
};

const getters = {
  getDir(state) {
    return state.dir;
  },
  getData(state){
    return state.data;
  },
  getTagTable(state){
    return state.tagTable;
  },
  getOutputDir(state){
    return state.OutputDir;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
