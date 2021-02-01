var MCT = {};
MCT.TITLE = "Simple Long/Short Gain Calculator";
const CI = {
  INDEX: 0,
  DATE: 1,
  PRICE: 2,
  UNIT: 3,
  FEE: 4,
  COST: 5,
};
const TSV_CI = {
  BROKER: 0,
  DATE: 1,
  PRICE: 2,
  UNIT: 3,
  FEE: 4,
  MEMO: 5,
  MAX: 5,
};

const zeroPadStr = (numstr, places) => numstr.padStart(places, '0')

window.onload = function(){
  var h1 = document.createElement("H1");
  var title = document.createTextNode(MCT.TITLE);
  h1.appendChild(title);
  h1.style = "text-align: center;";
  document.body.appendChild(h1);
  
  // tax year selector
  var sel_ty = doce("select");
  sel_ty.id = "sel_ty";
  var opt_ty2020 = doce("option");
  opt_ty2020.value="2020";
  opt_ty2020.selected="";
  opt_ty2020.innerHTML= "TY 2020";
  var opt_ty2019 = doce("option");
  opt_ty2019.value="2019";
  opt_ty2019.innerHTML= "TY 2019";
  sel_ty.appendChild(opt_ty2020);
  sel_ty.appendChild(opt_ty2019);
  document.body.appendChild(sel_ty);


  // tsv file input
  var tsv_input = doce("INPUT","file");
  document.body.appendChild(tsv_input);
  tsv_input.onchange = () => {
    clearTable();
    let tsv_file = tsv_input.files[0];
    let tsv_reader = new FileReader();
    tsv_reader.readAsText(tsv_file);
    tsv_reader.onload = readTSV;
  }
  
  var btn_calc = doce("button");
  btn_calc.appendChild(document.createTextNode("Calc"));
  btn_calc.onclick = calc;
  document.body.appendChild(btn_calc);

  var btn_save = doce("button");
  btn_save.appendChild(document.createTextNode("Save"));
  btn_save.onclick = writeTSV;
  document.body.appendChild(btn_save);


  hori_sep();
  

  var table = doce( "table" );
  table.setAttribute("id", "table");
  table.setAttribute("border", "1px");
  table.style = "width:100%; font-family: monospace; border-collapse: collapse;"
  document.body.appendChild(table);
  var header = table.createTHead();
  var hrow = header.insertRow(0);
  hrow.innerHTML = "<td></td><td>Date</td><td>Price</td><td>Unit</td><td>Fee</td><td>Gain=Proceed-Cost-Fee</td><td>Ins</td><td>Del</td>";
  var tbody = doce( 'tbody' );
  tbody.id = "tbody";
  table.appendChild(tbody);

  
  hori_sep();
  

  var fmla_l = doce("div");
  fmla_l.setAttribute("id", "formula_long");
  fmla_l.appendChild(document.createTextNode(""));
  fmla_l.style.fontFamily = "monospace";
  fmla_l.style.fontSize = 12;
  document.body.appendChild(fmla_l);

  document.body.appendChild(document.createElement("br"));
  
  var expo_l = doce("div");
  expo_l.setAttribute("id", "export_long");
  expo_l.style.fontFamily = "monospace";
  expo_l.style.fontSize = 12;
  document.body.appendChild(expo_l);
  
  hori_sep();
  
  var fmla_s = doce("div");
  fmla_s.setAttribute("id", "formula_short");
  fmla_s.appendChild(document.createTextNode(""));
  fmla_s.style.fontFamily = "monospace";
  fmla_s.style.fontSize = 12;
  document.body.appendChild(fmla_s);

  document.body.appendChild(document.createElement("br"));
  
  var expo_s = doce("div");
  expo_s.setAttribute("id", "export_short");
  expo_s.appendChild(document.createTextNode(""));
  expo_s.style.fontFamily = "monospace";
  expo_s.style.fontSize = 12;
  document.body.appendChild(expo_s);

  hori_sep();
  
  //should fixed sample data specified in
  //this func be used, uncomment this.
  //add_sample_data();
}

function readTSV(event) {
  const cellExaminors = [];
  cellExaminors[TSV_CI.BROKER]=function(c) { return c; }
  cellExaminors[TSV_CI.DATE]=function(c) {
    let match;
    // valid datetime formats:
    // YYYY/MM/DD, or YYYY-MM-DD, or YYYY/MM/DD HH:mm:ss (time ignored)
    if ((match = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(c)) !== null ||
        (match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(c)) !== null ||
        (match = /^(\d{4})\/(\d{1,2})\/(\d{1,2}) \d{1,2}:\d{1,2}:\d{1,2}$/.exec(c)) !== null) {
      return match[1] + "-" + zeroPadStr(match[2],2) + "-" + zeroPadStr(match[3],2);
    } else { return ""; }
  }
  cellExaminors[TSV_CI.PRICE]=function(c) {
    if ( /^\d{1,}$/.test(c) || /^\d{1,}\.\d{1,}$/.test(c) ) {
      return c;
    } else { return ""; }
  }
  cellExaminors[TSV_CI.UNIT]=function(c) {
    if ( /^(-{0,1})(\d{1,}\.\d{1,})$/.test(c)) {
      return c;
    } else { return ""; }
  }
  cellExaminors[TSV_CI.FEE]=function(c) {
    if (/^\d{1,}$/.test(c) || /^\d{1,}\.\d{1,}$/.test(c)) {
      return parseFloat(c).toFixed(2);
    } else { return ""; }
  }
  cellExaminors[TSV_CI.MEMO]=function(c) { return c; }
  function isValidRow(sa) {
    return (TSV_CI.DATE in sa && sa[TSV_CI.DATE] != "" &&
            TSV_CI.PRICE in sa &&sa[TSV_CI.PRICE] != "" &&
            TSV_CI.UNIT in sa && sa[TSV_CI.UNIT] != "");
  }
  const sLines = event.target.result.replaceAll('$','').replaceAll(',','').replaceAll('\"','').split('\n');
  for (const sOneLine of sLines) {
    var sData = {};
    for (const [cellIndex, sCell] of sOneLine.split('\t').entries()) {
      if (cellExaminors[cellIndex] != null) { sData[cellIndex] = cellExaminors[cellIndex](sCell); }
      if (TSV_CI.MAX <= cellIndex) { break; }
    }
    if (isValidRow(sData)) { addNewRow(sData); } else { console.warn(sOneLine); }
  }
}

//add this in isValidRow() block to put sample data
//addnewrowStr+="addNewRow(-1,\""+date_str+"\",\""+buysell_str+"\","+price_str+","+unit_str+");\n";

function writeTSV(content, filename, contentType)
{
  let txt_l = document.getElementById("export_long").textContent.replaceAll(' ','\t');
  let txt_s = document.getElementById("export_short").textContent.replaceAll(' ','\t');
  let txt_h = "Sell Broker\tBuy Broker\tSold Date\tPurchase Date\tQty\tProceed\tCost\tGain/Loss\tSell Memo\tBuy Memo\n";
  let blob = new Blob(["\nLONG\n"+txt_h+txt_l+"\n\nSHORT\n"+txt_h+txt_s],{type:"text/plan"});
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'export.tsv';
  link.appendChild(document.createTextNode("aaaa"));
  link.click();
}


function calc() {
  clearCostInfo();

  // TY
  var sel_ty_val = parseInt(document.getElementById("sel_ty").value);
  var ty_start = (+new Date(sel_ty_val,1,1)), ty_end   = (+new Date(sel_ty_val+1,1,1));    
  
  // calculate
  var res = {}; res['long'] = {}; res['short'] = {};
  res['long'].gain  = 0.00; res['long'].fmla  = ""; res['long'].expo  = "";
  res['short'].gain = 0.00; res['short'].fmla = ""; res['short'].expo = "";
  var {buys, sells} = readHTMLtable();
  for (const sell of sells) {
    for (const buy of buys) {
      var unit = 0;
      if (buy.unit == 0    /* already taken for calc */ ||
          sell.ds < buy.ds /* buy is newer */) {
        continue;
      } else if (sell.unit <= buy.unit) {
        buy.unit = (buy.unit - sell.unit).toFixed(8);
        unit = sell.unit; sell.unit = 0;
      } else /* buy.unit < sell.unit */ {
        sell.unit = (sell.unit - buy.unit).toFixed(8);
        unit = buy.unit; buy.unit = 0;
      }

      var r = isLong(buy.ds, sell.ds) ? res['long'] : res['short']; // long or short
      if (ty_start <= sell.ds && sell.ds < ty_end) { // only calc for this TY
        const {gain,fmla,expo} = calc1part(buy, sell, unit);
        r.gain += gain; r.fmla += fmla; r.expo += expo;
        addCostInfo(buy,sell,unit,gain,fmla);
      }

      // break to the next sell if all of the current sell is calculated
      if (sell.unit) continue; else break;
    }
    if (sell.unit) { throw "Insufficient buy for:"+sell.date+' '+sell.unit+ " units for  "+sell.price; }
  }

  // show calc result
  res['long'].fmla = res['long'].fmla.slice(0, -2);   // remove trailing ' + '
  res['short'].fmla = res['short'].fmla.slice(0, -2); // remove trailing ' + '
  var fmla_long = document.getElementById("formula_long");
  fmla_long.firstChild.nodeValue = sel_ty_val + " long  gain: " + res['long'].gain.toFixed(2) + " = " + res['long'].fmla;
  document.getElementById("export_long").innerHTML = res['long'].expo;
  var fmla_short = document.getElementById("formula_short");
  fmla_short.firstChild.nodeValue = sel_ty_val + " short gain: " + res['short'].gain.toFixed(2) + " = " + res['short'].fmla;
  document.getElementById("export_short").innerHTML = res['short'].expo;
}

function calc1part(buy, sell, unit) {
  var buy_fee  = buy.fee  * (unit / buy.unit0);
  var sell_fee = sell.fee * (unit / sell.unit0);
  var gain_ = (sell.price - buy.price) * unit - buy_fee - sell_fee;
  
  var fmla_ = "(" + sell.price + " - " + buy.price + ") x " + unit;
  fmla_ += (buy.fee == 0) ? "" : ' - ' + buy.fee +
    ( (unit == buy.unit0) ? "" : ' x ' +  ' (' + unit + '/'  + buy.unit0  + ')' );
  fmla_ += (sell.fee == 0) ? "" : ' - ' + sell.fee +
    ( (unit == sell.unit0) ? "" : ' x ' +  ' (' + unit + '/'  + sell.unit0  + ')' );
  fmla_ += ' + ';

  var expo_ = sell.broker + ' ' + buy.broker + ' ' +
      convDateStr(sell.date) + ' ' + convDateStr(buy.date) + ' ' + unit + ' ' +
      (sell.price * unit - sell_fee).toFixed(2) + ' ' +
      (buy.price  * unit + buy_fee).toFixed(2) + ' ' +
      ((sell.price - buy.price) * unit - sell_fee - buy_fee).toFixed(2) + ' ' +
      sell.memo + ' ' + buy.memo + '\n<br>';
  
  return { gain: gain_, fmla: fmla_, expo: expo_ };
}

function convDateStr(dateStr) {
  let ret = "";
  let match;
  let reYMDslash = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
  let reYMDhyphen = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
  if ((match = reYMDslash.exec(dateStr)) !== null ||
      (match = reYMDhyphen.exec(dateStr)) !== null) {
    ret = zeroPadStr(match[2],2) + "-" + zeroPadStr(match[3],2) + "-" + match[1];
  } else {
    console.error(dateStr);
    throw 'Wrong date string format (must YYYY/MM/DD)'
  }
  return ret;
}

function addNewRow(o) {
  addNewRowRaw(-1,
               o[TSV_CI.BROKER],
               o[TSV_CI.DATE],
               o[TSV_CI.PRICE],
               o[TSV_CI.UNIT],
               o[TSV_CI.FEE],
               o[TSV_CI.MEMO]);
}

function addNewRowRaw(index, broker, date, price, unit, fee, memo) {
  var tbody = document.getElementById("tbody");
  var row = tbody.insertRow( index );

  // Index
  var cell = row.insertCell(-1);
  cell.appendChild(document.createTextNode("9999"));
  cell.style.foregroundColor = "#bbb";
  cell.style.textAlign = "right";
  cell.setAttribute("broker", (broker!=null&&broker!=undefined)?broker:"");
  cell.setAttribute("memo", (memo!=null&&memo!=undefined)?memo:"");
  
  // Date
  var cell = row.insertCell(-1);
  var input = doce( 'input' );
  input.type = "date";
  input.style.textAlign = "right";
  input.style.fontSize = 12;
  if (date != "") input.value = date;
  cell.appendChild(input);
  cell.style.backgroundColor = "#bbb";

  // Price
  cell = row.insertCell(-1);
  input = doce('input');
  input.type = "text"; input.value = "0";
  input.style.textAlign = "right";
  input.style.fontSize = 12;
  input.size = 6;
  cell.appendChild(input);
  if (price != "") input.value = price;

  // Unit
  cell = row.insertCell(-1);
  input = doce('input');
  input.type = "text"; input.value = "0";
  input.style.textAlign = "right";
  input.style.fontSize = 12;
  input.size = 6;
  input.onchange = () => {
    if (input.value[0] == '-') {
      //row.style.color = "#f00";
      row.style.backgroundColor = "#ffe4e1";
      input.style.color = "#f00";
    }
  }
  cell.appendChild(input);
  if (unit != "" && unit != null) {
    input.value = unit;
    input.onchange();
  }

  // Fee info
  cell = row.insertCell(-1);
  var text_fee = doce("div");
  text_fee.appendChild(document.createTextNode(fee));
  text_fee.style.textAlign="right";
  cell.appendChild(text_fee);
  
  // Cost info
  cell = row.insertCell(-1);
  var text_cost = doce("div");
  text_cost.appendChild(document.createTextNode(""));
  cell.appendChild(text_cost);
  
  // row add button
  cell = row.insertCell(-1);
  var btn = doce("button");
  btn.appendChild(document.createTextNode("+"));
  btn.onclick = function() {
    addNewRowRaw(this.parentElement.parentElement.rowIndex, "", "", 0, 0, "");
  };
  cell.appendChild(btn);

  // row remove button
  cell = row.insertCell(-1);
  var btn1 = doce("button");
  btn1.appendChild(document.createTextNode("-"));
  btn1.onclick = function() {
    var tbl = document.getElementById("table");
    if (tbl == null) { console.error("no table"); }
    if (2 < tbl.rows.length) {
      var row = this.parentNode.parentNode;
      row.parentNode.removeChild(row);
      // update indexes
      updateTableIndexes();
    }
  };
  cell.appendChild(btn1);

  // update indexes
  updateTableIndexes();
}

function readHTMLtable() {
  var buys = [], sells = [];
  var tbl = document.getElementById("table");
  if (tbl == null) { throw "no table"; }
  for (const row of tbl.rows) {
    if (isTableHeadRow(row)) { continue; }
    var act = {}; var ta;
    for (const cell of row.cells) {
      var val = cell.firstChild.value;
      switch(cell.cellIndex) {
      case CI.INDEX:
        act.index = cell.firstChild.textContent;
        act.broker = cell.getAttribute('broker');
        act.memo = cell.getAttribute('memo'); break;
      case CI.DATE:
        ymd = getYMD(val);
        act.ds = (+new Date(ymd[0],ymd[1],ymd[2]));
        act.date = val; break;
      case CI.PRICE: act.price=val; break;
      case CI.UNIT:
        act.unit=act.unit0=Math.abs(val);
        (0<val) ? ta=buys : ta=sells;break;
      case CI.FEE:
        act.fee = 0;
        if (0 < cell.firstChild.textContent.length ) {
          act.fee=parseFloat(textcon);
        } break;
      }
    }
    ta.push(act);
  }
  
  // sort array
  buys.sort(function(a,b)  {
    return ((a.ds == b.ds) ? (a.index - b.index) : (a.ds - b.ds))
  }); 
  sells.sort(function(a,b) {
    return a.ds - b.ds
  });

  return {buys,sells};
}

function clearTable() {
  var tableHeaderRowCount = 1;
  var table = document.getElementById('table');
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
}

function clearCostInfo() {
  var tbl = document.getElementById("table");
  for (const row of tbl.rows) {
    if (isTableHeadRow(row)) { continue; }
    row.cells[CI.COST].firstChild.innerHTML = "";
  }
}

function updateTableIndexes() {
  var tbl = document.getElementById("table");
  for (const row of tbl.rows) {
    if (isTableHeadRow(row)) { continue; }
    row.cells[CI.INDEX].firstChild.nodeValue = row.rowIndex;
  }  
}

function addCostInfo(buy, sell, units, gain, fmla) {
  var tbl = document.getElementById("table"); var done = [false,false];
  for (const row of tbl.rows) {
    if (isTableHeadRow(row)) { continue; }
    if (buy.index == row.cells[CI.INDEX].firstChild.textContent) {
      row.style.backgroundColor = "#00ffff"; done[0] = true;
    } else if (sell.index == row.cells[CI.INDEX].firstChild.textContent) {
      row.style.backgroundColor = "#ff00ff"; done[1] = true;
      row.cells[CI.COST].firstChild.innerHTML += ' ' +
        buy.date + (isLong(buy.ds, sell.ds) ? '(L)' : '(S)') + ' ' +
        gain.toFixed(2) + ' = ' + fmla.slice(0, -2) + "<br>";
    }
    if (done[0] && done[1]) { return; }
  }
  throw 'No associated row(s) found';
}

function doce(elemtype) {
  return document.createElement(elemtype);
}

function doce(elemtype, attribute) {
  var ret = document.createElement(elemtype);
  ret.setAttribute("type", attribute);
  return ret;
}

function hori_sep() {
  var hr = doce('hr');
  document.body.appendChild(hr);
}

function getYMD(ymd) {
  const parts = ymd.split('-');
  if (parts.length == 3) {
    return [parseInt(parts[0]),
            parseInt(parts[1]),
            parseInt(parts[2])];
  } else {
    throw 'date str not including all of YYYY MM DD';
  }
}

function isLong(ms1,ms2) {
  //1 day    = 86400000 ms (60 x 60 x 24 x 1000)
  //365 days = 31536000000 ms (86400000 ms x 365)
  return (31536000000 < (ms2 - ms1));
}

function isTableHeadRow(row) {
  if (row.cells[0].firstChild != null) { return false; }
  else { return true; }
}
