const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const _ = require("lodash")

//******** settings ***********************************************************

const ioPath = "IO Connect Rework";

//*****************************************************************************

const changeText = function (obj) {

  let textToChange = obj.text;
  obj.text = _.camelCase(obj.text) 
  let objNr = textToChange.match(/[a-z]*\d{5}[a-z0-9_-]*/gi);
  let objPup = textToChange.match(/Xpup[a-z0-9/_-]*\S/gi);
  if (objPup){
    objPup[0] = objPup[0].toLowerCase()
  }
  
  if (objNr) {
    // RC Stop forward
    if (textToChange.match(/Stop pal/gi) && !textToChange.match(/Arri/gi)) {
      obj.text = "rc" + objNr.join("-") + "StopForwards";
      obj.changed = true;
    }
    // RC Stop backwards
    if (textToChange.match(/Stop pal/gi) && textToChange.match(/Arri/gi)) {
      obj.text = "rc" + objNr.join("-") + "StopBackwards";
      obj.changed = true;
    }
    // RC Stop backwards
    if (textToChange.match(/Stop/gi) && textToChange.match(/1ERE/gi) && textToChange.match(/PAL/gi)) {
      obj.text = "rc" + objNr.join("-") + "ClockUp";
      obj.changed = true;
    }

    // RC clearance forwards
    if (
      textToChange.match(/Debor/gi) &&
      !textToChange.match(/Arri/gi) &&
      !textToChange.match(/ctrl/gi)
    ) {
      obj.text = "rc" + objNr.join("-") + "ClearanceForwards";
      obj.changed = true;
    }

    // RC clearance backwards
    if (
      textToChange.match(/Debor/gi) &&
      textToChange.match(/Arri/gi) &&
      !textToChange.match(/ctrl/gi)
    ) {
      obj.text = "rc" + objNr.join("-") + "ClearanceBackwards";
      obj.changed = true;
    }

    //RC Thermal
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Therm/gi) &&
      (textToChange.match(/\/1\s|\/1$/gi) || !textToChange.match(/\//gi))
    ) {
      obj.text = "rc" + objNr.join("-") + "Thermal";
      obj.changed = true;
    }
    // RC MainSwitch
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/I\.M\.|IM /gi) &&
      (textToChange.match(/\/1\s|\/1$/gi) || !textToChange.match(/\//gi))
    ) {
      obj.text = "rc" + objNr.join("-") + "MainSwitch";
      obj.changed = true;
    }
    // RC Brake
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Frein/gi) &&
      (textToChange.match(/\/1\s|\/1$/gi) || !textToChange.match(/\//gi))
    ) {
      obj.text = "rc" + objNr.join("-") + "Brake";
      obj.changed = true;
    }
    //Turn Thermal
    if (
      textToChange.match(/Table/gi) &&
      textToChange.match(/Rota/gi) &&
      textToChange.match(/Therm/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "turn" + objNr.join("-") + "Thermal";
      obj.changed = true;
    }
    //Turn Thermal
    if (
      textToChange.match(/Table/gi) &&
      textToChange.match(/Rota/gi) &&
      textToChange.match(/Frein/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "turn" + objNr.join("-") + "Brake";
      obj.changed = true;
    }
    //Turn MainSwitch
    if (
      textToChange.match(/Table/gi) &&
      textToChange.match(/Rota/gi) &&
      textToChange.match(/I\.M\.|IM /gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "turn" + objNr.join("-") + "MainSwitch";
      obj.changed = true;
    }
    // Turn stop 0°
    if (
      textToChange.match(/Stop/gi) &&
      textToChange.match(/0°/gi) &&
      textToChange.match(/Rota/gi)
    ) {
      obj.text = "turn" + objNr.join("-") + "Detection0";
      obj.changed = true;
    }
    // Turn slow down 0°
    if (
      textToChange.match(/Ralen/gi) &&
      textToChange.match(/0°/gi) &&
      textToChange.match(/Rota/gi)
    ) {
      obj.text = "turn" + objNr.join("-") + "DetectionSlowDown0";
      obj.changed = true;
    }
    // Turn stop 90°
    if (
      textToChange.match(/Stop/gi) &&
      textToChange.match(/90°/gi) &&
      textToChange.match(/Rota/gi)
    ) {
      obj.text = "turn" + objNr.join("-") + "Detection90";
      obj.changed = true;
    }
    // Turn slow down 90°
    if (
      textToChange.match(/Ralen/gi) &&
      textToChange.match(/90°/gi) &&
      textToChange.match(/Rota/gi)
    ) {
      obj.text = "turn" + objNr.join("-") + "DetectionSlowDown90";
      obj.changed = true;
    }
    // Conveyor Estop
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Arre/gi) &&
      textToChange.match(/Urg/gi)
    ) {
      obj.text = "rc" + objNr.join("-") + "Estop";
      obj.changed = true;
    }

    //Dummy Thermal
    if (
      textToChange.match(/Conv/gi) && !textToChange.match(/Mont/gi) && !textToChange.match(/Desc/gi) &&
      textToChange.match(/Therm/gi) &&
      (textToChange.match(/\//gi) && !textToChange.match(/\/1\s|\/1$/gi))
    ) {
      let dummyNumberRegex = /(?:\/)(\d*)/gi;
      let regexRes = dummyNumberRegex.exec(textToChange)
      let dummyNumber = ''
      if (regexRes){dummyNumber = regexRes[1]}
      obj.text = "dummy" + objNr.join("-") + "-" + dummyNumber + "Thermal";

      obj.changed = true;
    }
    //Dummy mainSwitch
    if (
      textToChange.match(/Conv/gi) && !textToChange.match(/Mond/gi) && !textToChange.match(/Desc/gi) &&
      textToChange.match(/I\.M\.|IM /gi) &&
      (textToChange.match(/\//gi) && !textToChange.match(/\/1\s|\/1$/gi))
    ) {
      let dummyNumberRegex = /(?:\/)(\d*)/gi;
      let regexRes = dummyNumberRegex.exec(textToChange)
      let dummyNumber =''
      if (regexRes){dummyNumber = regexRes[1]}
      obj.text = "dummy" + objNr.join("-") +"-" + dummyNumber + "MainSwitch";

      obj.changed = true;
    }
    //Lift thermal
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Therm|Alim/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "Thermal";

      obj.changed = true;
    }

    //Lift mainSwitch
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/^I\.M\.|^IM /gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "MainSwitch";

      obj.changed = true;
    }

    //Lift brake
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/frein /gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "Brake";

      obj.changed = true;
    }

    //Lift limit switch down
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/secu/gi) &&
      textToChange.match(/bas/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "LimitSwitchDown";

      obj.changed = true;
    }
    //Lift limit switch up
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/secu/gi) &&
      textToChange.match(/haut/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "LimitSwitchUp";

      obj.changed = true;
    }

    //Lift Detection Up
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Pos/gi) &&
      textToChange.match(/haut/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "DetectionUp";

      obj.changed = true;
    }
    //Lift Detection down
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Pos/gi) &&
      textToChange.match(/bas/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "DetectionDown";

      obj.changed = true;
    }
    //Lift Detection slow down Up
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Ralen/gi) &&
      textToChange.match(/haut/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "DetectionSlowDownUp";

      obj.changed = true;
    }
    //Lift Detection slow down down
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Ralen/gi) &&
      textToChange.match(/Bas/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "lift" + objNr.join("-") + "DetectionSlowDownDown";

      obj.changed = true;
    }

    //Hoist Thermal
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Mont/gi) &&
      textToChange.match(/Desc/gi) &&
      textToChange.match(/Therm/gi)
    ) {
      let idRegex = /(\d{5})(?:\/)(\d*)/gi;
      let id = ''
      let regexRes = idRegex.exec(textToChange)
      if (regexRes){id = regexRes[2]}

      obj.text = "hoist" + objNr.join("-") + "-" + id + "Thermal";

      obj.changed = true;
    }
    //Hoist mainSwitch
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Mont/gi) &&
      textToChange.match(/Desc/gi) &&
      textToChange.match(/I\.M\.|IM /gi)

    ) {
      let idRegex = /(\d{5})(?:\/)(\d*)/gi;
      let id = ''
      let regexRes = idRegex.exec(textToChange)
      if (regexRes){id = regexRes[2]}
      obj.text = "hoist" + objNr.join("-") + "-" + id + "MainSwitch";

      obj.changed = true;
    }

    //Hoist detection up
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Pos/gi) &&
      textToChange.match(/haut/gi)
    ) {
      let idRegex = /(?:\/)(\d*)/gi;
      let regexRes = idRegex.exec(textToChange)
      let id = ''
      if (regexRes){id = regexRes[1]}
      obj.text = "hoist" + objNr.join("-") + "-" + id + "DetectionUp";
      obj.changed = true;
    }

    //Hoist detection down
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Pos/gi) &&
      textToChange.match(/bas/gi)
    ) {
      let idRegex = /(?:\/)(\d*)/gi;
      let regexRes = idRegex.exec(textToChange)
      let id = ''
      if (regexRes){id = regexRes[1]}
      obj.text = "hoist" + objNr.join("-") + "-" + id + "DetectionDown";

      obj.changed = true;
    }

    //Hoist movement up
    if (
      textToChange.match(/Conv/gi) &&
      !textToChange.match(/Pos/gi) &&
      textToChange.match(/mont/gi) &&
      !textToChange.match(/desc/gi)
    ) {
      let idRegex = /(?:\/)(\d*)/gi;
      let regexRes = idRegex.exec(textToChange)
      let id = ''
      if (regexRes){id = regexRes[1]}
      obj.text = "hoist" + objNr.join("-") + "-" + id + "MovementUp";

      obj.changed = true;
    }

    //Hoist movement down
    if (
      textToChange.match(/Conv/gi) &&
      !textToChange.match(/Pos/gi) &&
      !textToChange.match(/mont/gi) &&
      textToChange.match(/desc/gi)
    ) {
      let idRegex = /(?:\/)(\d*)/gi;
      let id = ''
      let regexRes = idRegex.exec(textToChange)
      if (regexRes){id = regexRes[1]}
      obj.text = "hoist" + objNr.join("_") + "-" + id + "MovementDown";

      obj.changed = true;
    }


  }
  if (objPup) {
    // xpup push button
    if (textToChange.match(/Xpup/gi) && textToChange.match(/Command/gi)) {
      obj.text = objPup + "PushButton";
      obj.changed = true;
    }
    // xpup reset
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Res/gi) &&
      textToChange.match(/Def/gi)
    ) {
      obj.text = objPup + "Reset";
      obj.changed = true;
    }
    // wpup reset Safety
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Res/gi) &&
      textToChange.match(/Sec/gi)
    ) {
      obj.text = objPup + "ResetSafety";
      obj.changed = true;
    }
    // xpup light reset safety
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Lamp/gi) &&
      textToChange.match(/Res/gi) &&
      textToChange.match(/Sec/gi)
    ) {
      obj.text = objPup + "LightResetSafety";
      obj.changed = true;
    }
    // xpup light reset fault
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Lamp/gi) &&
      textToChange.match(/Def/gi)
    ) {
      obj.text = objPup + "LightFault";
      obj.changed = true;
    }
    // xpup light 
    console.log(textToChange)
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Lamp/gi) &&
      textToChange.match(/Auto/gi)
    ) {
      obj.text = objPup + "LightAuto";
      obj.changed = true;
    }
    // xpup horn
    if (textToChange.match(/Xpup/gi) && textToChange.match(/Klax/gi)) {
      obj.text = objPup + "Horn";
      obj.changed = true;
    }

    // xpup Estop
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Arre/gi) &&
      textToChange.match(/Urg/gi)
    ) {
      obj.text = objPup + "Estop";
      obj.changed = true;
    }

  }

  //console.log(obj)
  return obj;
};

const readExcel = function (dir) {
  const ioXl = xlsx.readFile(dir.toString());
  let ioList = [];
  let sheets = ioXl.SheetNames;
  for (let sheet of sheets) {
    let ioSheet = ioXl.Sheets[sheet];
    var range = xlsx.utils.decode_range(ioSheet["!ref"]);
    let ioMaxRows = range.e.r;
    for (let row = 3; row < ioMaxRows + 2; row++) {
      let cellIo = ioSheet["C" + row];
      let cellText = ioSheet["E" + row];
      let cellArmoire = ioSheet["A" + row];
      let cellBoite = ioSheet["B" + row];
      let cellCapteur = ioSheet["F" + row];

      if (cellIo && cellText) {
        let obj = {};
        obj.io = cellIo.v.trim();
        obj.text = cellText.v.trim();
        obj.bool = "BOOL";
        obj.changed = false;
        obj.comment = "";
        if (cellArmoire) {
          obj.armoire = cellArmoire.v.trim();
          obj.comment += obj.armoire;
        }
        if (cellBoite) {
          obj.boite = cellBoite.v.trim();
          obj.comment += " " + obj.boite;
        }
        if (cellCapteur) {
          obj.capteur = cellCapteur.v.trim();
          obj.comment += " " + obj.capteur;
        }
        try {
          obj = changeText(obj);
          ioList.push(obj);
        } catch (error) {
          console.log(error)
        }

      }
    }
  }
  return ioList;
};

const writeIo = function (filename, data, tagTable) {
  let heading = [
    [
      "Name",
      "Path",
      "Data Type",
      "Logical Address",
      "Comment",
      "Hmi Visible",
      "Hmi Accessible",
      "Hmi Writeable",
      "Typeobject ID",
      "Version ID"
    ]
  ];
  var ws_name = "PLC Tags";
  var wb = xlsx.utils.book_new();
  /* convert an array of arrays in JS to a CSF spreadsheet */
  let ws = xlsx.utils.aoa_to_sheet(heading, {
    cellDates: true
  });
  data.forEach((io, index) => {
    // tag name
    let cellTag = {
      t: "s",
      v: io.text
    };
    ws["A" + (index + 2)] = cellTag;
    // Tagtable
    let cellTagTable = {
      t: "s",
      v: tagTable
    };
    ws["B" + (index + 2)] = cellTagTable;
    // DataType
    let cellDataType = {
      t: "s",
      v: "BOOL"
    };
    ws["C" + (index + 2)] = cellDataType;
    //Adress
    let cellAddress = {
      t: "s",
      v: io.io
    };
    ws["D" + (index + 2)] = cellAddress;
    //Comment
    let cellComment = {
      t: "s",
      v: io.comment
    };
    ws["E" + (index + 2)] = cellComment;

    // hmi
    ws["F" + (index + 2)] = {
      t: "s",
      v: "TRUE"
    };
    ws["G" + (index + 2)] = {
      t: "s",
      v: "TRUE"
    };
    ws["H" + (index + 2)] = {
      t: "s",
      v: "TRUE"
    };
  });
  ws["!ref"] = "A1:J" + (data.length + 1);

  xlsx.utils.book_append_sheet(wb, ws, ws_name);

  xlsx.writeFileAsync(filename, wb, () => {
    alert(filename + " saved");
  });
};

export {
  readExcel,
  changeText,
  writeIo
};