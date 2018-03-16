const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

//******** settings ***********************************************************

const ioPath = "IO Connect Rework";

//*****************************************************************************

const autoCase = function(text) {
  return text.replace(/(&)?([a-z])([a-z]{2,})(;)?/gi, function(
    all,
    prefix,
    letter,
    word,
    suffix
  ) {
    if (prefix && suffix) {
      return all;
    }

    return letter.toUpperCase() + word.toLowerCase();
  });
};

const changeText = function(obj) {
  obj.text = autoCase(obj.text);
  let textToChange = obj.text;
  let objNr = textToChange.match(/[a-z]*\d{5}[a-z0-9_-]*/gi);
  let objPup = textToChange.match(/Xpup[a-z0-9/_-]*\S/gi);
  if (objNr) {
    // RC Stop forward
    if (textToChange.match(/Stop pal/gi) && !textToChange.match(/Arri/gi)) {
      obj.text = "RC " + objNr.join("-") + " Stop forwards=0";
      obj.changed = true;
    }
    // RC Stop backwards
    if (textToChange.match(/Stop pal/gi) && textToChange.match(/Arri/gi)) {
      obj.text = "RC " + objNr.join("-") + " Stop backwards=0";
      obj.changed = true;
    }
    // RC clearance forwards
    if (
      textToChange.match(/Debor/gi) &&
      !textToChange.match(/Arri/gi) &&
      !textToChange.match(/ctrl/gi)
    ) {
      obj.text = "RC " + objNr.join("-") + " Clearance forwards";
      obj.changed = true;
    }

    // RC clearance backwards
    if (
      textToChange.match(/Debor/gi) &&
      textToChange.match(/Arri/gi) &&
      !textToChange.match(/ctrl/gi)
    ) {
      obj.text = "RC " + objNr.join("-") + " Clearance backwards";
      obj.changed = true;
    }

    //RC Thermal
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Therm/gi) &&
      (textToChange.match(/\/1\s|\/1$/gi) || !textToChange.match(/\//gi))
    ) {
      obj.text = "RC " + objNr.join("-") + " Thermal";
      obj.changed = true;
    }
    // RC MainSwitch
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/I\.M\.|IM /gi) &&
      (textToChange.match(/\/1\s|\/1$/gi) || !textToChange.match(/\//gi))
    ) {
      obj.text = "RC " + objNr.join("-") + " MainSwitch";
      obj.changed = true;
    }
    // RC Brake
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Frein/gi) &&
      (textToChange.match(/\/1\s|\/1$/gi) || !textToChange.match(/\//gi))
    ) {
      obj.text = "RC " + objNr.join("-") + " Brake";
      obj.changed = true;
    }
    //Turn Thermal
    if (
      textToChange.match(/Table/gi) &&
      textToChange.match(/Rota/gi) &&
      textToChange.match(/Therm/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Turn " + objNr.join("-") + " Thermal";
      obj.changed = true;
    }
    //Turn Thermal
    if (
      textToChange.match(/Table/gi) &&
      textToChange.match(/Rota/gi) &&
      textToChange.match(/Frein/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Turn " + objNr.join("-") + " Brake";
      obj.changed = true;
    }
    //Turn MainSwitch
    if (
      textToChange.match(/Table/gi) &&
      textToChange.match(/Rota/gi) &&
      textToChange.match(/I\.M\.|IM /gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Turn " + objNr.join("-") + " MainSwitch";
      obj.changed = true;
    }
    // Turn stop 0°
    if (
      textToChange.match(/Stop/gi) &&
      textToChange.match(/0°/gi) &&
      textToChange.match(/Rota/gi)
    ) {
      obj.text = "Turn " + objNr.join("-") + " Detection 0°";
      obj.changed = true;
    }
    // Turn slow down 0°
    if (
      textToChange.match(/Ralen/gi) &&
      textToChange.match(/0°/gi) &&
      textToChange.match(/Rota/gi)
    ) {
      obj.text = "Turn " + objNr.join("-") + " Detection slow down 0°";
      obj.changed = true;
    }
    // Turn stop 90°
    if (
      textToChange.match(/Stop/gi) &&
      textToChange.match(/90°/gi) &&
      textToChange.match(/Rota/gi)
    ) {
      obj.text = "Turn " + objNr.join("-") + " Detection 90°";
      obj.changed = true;
    }
    // Turn slow down 90°
    if (
      textToChange.match(/Ralen/gi) &&
      textToChange.match(/90°/gi) &&
      textToChange.match(/Rota/gi)
    ) {
      obj.text = "Turn " + objNr.join("-") + " Detection slow down 90°";
      obj.changed = true;
    }
    // Conveyor Estop
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Arre/gi) &&
      textToChange.match(/Urg/gi)
    ) {
      obj.text = "RC " + objNr.join("-") + " Estop";
      obj.changed = true;
    }

    //Dummy Thermal
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/Therm/gi) &&
      (textToChange.match(/\//gi) && !textToChange.match(/\/1\s|\/1$/gi))
    ) {
      let dummyNumberRegex = /(?:\/)(\d*)/gi;
      let dummyNumber = dummyNumberRegex.exec(textToChange)[1];
      obj.text = "Dummy " + objNr.join("-") + "-" + dummyNumber + " Thermal";

      obj.changed = true;
    }
    //Dummy mainSwitch
    if (
      textToChange.match(/Conv/gi) &&
      textToChange.match(/I\.M\.|IM /gi) &&
      (textToChange.match(/\//gi) && !textToChange.match(/\/1\s|\/1$/gi))
    ) {
      let dummyNumberRegex = /(?:\/)(\d*)/gi;
      let dummyNumber = dummyNumberRegex.exec(textToChange)[1];
      obj.text = "Dummy " + objNr.join("-") + "-" + dummyNumber + " MainSwitch";

      obj.changed = true;
    }
    //Lift thermal
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Therm|Alim/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " Thermal";

      obj.changed = true;
    }

    //Lift mainSwitch
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/^I\.M\.|^IM /gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " MainSwitch";

      obj.changed = true;
    }

    //Lift brake
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/frein /gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " Brake";

      obj.changed = true;
    }

    //Lift limit switch down
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/secu/gi) &&
      textToChange.match(/bas/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " limit switch down";

      obj.changed = true;
    }
    //Lift limit switch up
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/secu/gi) &&
      textToChange.match(/haut/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " limit switch up";

      obj.changed = true;
    }

    //Lift Detection Up
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Pos/gi) &&
      textToChange.match(/haut/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " Detection up";

      obj.changed = true;
    }
    //Lift Detection down
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Pos/gi) &&
      textToChange.match(/bas/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " Detection down";

      obj.changed = true;
    }
    //Lift Detection slow down Up
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Ralen/gi) &&
      textToChange.match(/haut/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " Detection slow down up";

      obj.changed = true;
    }
    //Lift Detection slow down down
    if (
      textToChange.match(/Elev/gi) &&
      textToChange.match(/Ralen/gi) &&
      textToChange.match(/Bas/gi) &&
      textToChange.match(/\/2\s|\/2$/gi)
    ) {
      obj.text = "Lift " + objNr.join("-") + " Detection slow down down";

      obj.changed = true;
    }
  }
  if (objPup) {
    // xpup push button
    if (textToChange.match(/Xpup/gi) && textToChange.match(/Command/gi)) {
      obj.text = objPup + " Push button";
      obj.changed = true;
    }
    // xpup reset
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Res/gi) &&
      textToChange.match(/Def/gi)
    ) {
      obj.text = objPup + " Reset";
      obj.changed = true;
    }
    // wpup reset Safety
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Res/gi) &&
      textToChange.match(/Sec/gi)
    ) {
      obj.text = objPup + " Reset Safety";
      obj.changed = true;
    }
    // xpup light reset safety
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Lamp/g) &&
      textToChange.match(/Res/gi) &&
      textToChange.match(/Sec/gi)
    ) {
      obj.text = objPup + " Light reset safety";
      obj.changed = true;
    }
    // xpup light reset fault
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Lamp/g) &&
      textToChange.match(/Def/gi)
    ) {
      obj.text = objPup + " Light fault";
      obj.changed = true;
    }
    // xpup light Auto
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Lamp/g) &&
      textToChange.match(/Auto/gi)
    ) {
      obj.text = objPup + " Light auto";
      obj.changed = true;
    }
    // xpup horn
    if (textToChange.match(/Xpup/gi) && textToChange.match(/Klax/g)) {
      obj.text = objPup + " Horn";
      obj.changed = true;
    }

    // xpup Estop
    if (
      textToChange.match(/Xpup/gi) &&
      textToChange.match(/Arre/gi) &&
      textToChange.match(/Urg/gi)
    ) {
      obj.text = objPup + " Estop";
      obj.changed = true;
    }
  }

  //console.log(obj)
  return obj;
};

const readExcel = function(dir) {
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
        obj = changeText(obj);
        ioList.push(obj);
      }
    }
  }
  return ioList;
};

const writeIo = function(filename, data, tagTable) {
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
  let ws = xlsx.utils.aoa_to_sheet(heading, { cellDates: true });
  data.forEach((io, index) => {
    // tag name
    let cellTag = { t: "s", v: io.text };
    ws["A" + (index + 2)] = cellTag;
    // Tagtable
    let cellTagTable = { t: "s", v: tagTable };
    ws["B" + (index + 2)] = cellTagTable;
    // DataType
    let cellDataType = { t: "s", v: "BOOL" };
    ws["C" + (index + 2)] = cellDataType;
    //Adress
    let cellAddress = { t: "s", v: io.io };
    ws["D" + (index + 2)] = cellAddress;
    //Comment
    let cellComment = { t: "s", v: io.comment };
    ws["E" + (index + 2)] = cellComment;

    // hmi
    ws["F" + (index + 2)] = { t: "s", v: "TRUE" };
    ws["G" + (index + 2)] = { t: "s", v: "TRUE" };
    ws["H" + (index + 2)] = { t: "s", v: "TRUE" };
  });
  ws["!ref"] = "A1:J" + (data.length + 1);

  xlsx.utils.book_append_sheet(wb, ws, ws_name);

  xlsx.writeFileAsync(filename, wb, () => {
    alert(filename + " saved");
  });
};

export { readExcel, changeText, writeIo };
