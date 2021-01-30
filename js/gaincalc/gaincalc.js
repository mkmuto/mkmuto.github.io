var MCT = {};
MCT.MAD = 100000000;

const zeroPadStr = (numstr, places) => numstr.padStart(places, '0')

window.onload = function(){
    var h1 = document.createElement("H1");
    var title = document.createTextNode("Simple Long/Short Gain Calculator");
    h1.appendChild(title);
    h1.style = "text-align: center;";
    document.body.appendChild(h1);
    
    // tax year selector
    var sel_ty = doce("select");
    sel_ty.id = "sel_ty";
    var opt_ty2020 = doce("option");
    opt_ty2020.value="2020";//"1577836800000";
    opt_ty2020.selected="";
    opt_ty2020.innerHTML= "TY 2020";
    var opt_ty2019 = doce("option");
    opt_ty2019.value="2019";//"1546300800000";
    opt_ty2019.innerHTML= "TY 2019";
    sel_ty.appendChild(opt_ty2020);
    sel_ty.appendChild(opt_ty2019);
    document.body.appendChild(sel_ty);


    // tsv file input
    var tsv_input = doce("INPUT","file");
    document.getElementById("body").appendChild(tsv_input);
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
    document.getElementById("body").appendChild(btn_calc);

    var btn_save = doce("button");
    btn_save.appendChild(document.createTextNode("Save"));
    btn_save.onclick = writeTSV;
    document.body.appendChild(btn_save);


    hori_sep();
    

    var table = doce( "table" );
    table.setAttribute("id", "table");
    table.setAttribute("border", "1px");
    table.style = "font-family: monospace;"
    document.getElementById("body").appendChild(table);
    var header = table.createTHead();
    var hrow = header.insertRow(0);
    hrow.innerHTML = "<td></td><td>Date</td><td>Buy/Sell</td><td>Price</td><td>Unit</td><td>Fee</td><td>Gain=Proceed-Const-Fee</td><td>Ins</td><td>Del</td>";
    var tbody = doce( 'tbody' );
    tbody.id = "tbody";
    table.appendChild(tbody);

    
    hori_sep();
    

    var fmla_l = doce("div");
    fmla_l.setAttribute("id", "formula_long");
    fmla_l.appendChild(document.createTextNode(""));
    fmla_l.style.fontFamily = "monospace";
    fmla_l.style.fontSize = 12;
    document.getElementById("body").appendChild(fmla_l);

    document.getElementById("body").appendChild(document.createElement("br"));
    
    var expo_l = doce("div");
    expo_l.setAttribute("id", "export_long");
    expo_l.style.fontFamily = "monospace";
    expo_l.style.fontSize = 12;
    document.getElementById("body").appendChild(expo_l);
    
    hori_sep();
    
    var fmla_s = doce("div");
    fmla_s.setAttribute("id", "formula_short");
    fmla_s.appendChild(document.createTextNode(""));
    fmla_s.style.fontFamily = "monospace";
    fmla_s.style.fontSize = 12;
    document.getElementById("body").appendChild(fmla_s);

    document.getElementById("body").appendChild(document.createElement("br"));
    
    var expo_s = doce("div");
    expo_s.setAttribute("id", "export_short");
    expo_s.appendChild(document.createTextNode(""));
    expo_s.style.fontFamily = "monospace";
    expo_s.style.fontSize = 12;
    document.getElementById("body").appendChild(expo_s);

    hori_sep();
    
    //should fixed sample data specified in this func be used, uncomment this.
    //add_sample_data();
}


function readTSV(event) {
    const data = event.target.result;
    const dataArray = []; //array to store lines
    const dataString = data.split('\n'); //split by newline //var addnewrowStr="";
    for (let i = 0; i < dataString.length; i++) { //read each line
        let memo_str="",date_str="",buysell_str="buy",price_str="",unit_str="",fee_str="";
        dataArray[i] = dataString[i].split('\t');
        var validline=false;
        for (let j = 0; j < dataArray[i].length; j++) {
            let cell_str= dataArray[i][j].replace('$','').replace(',','').replaceAll('\"','');;
            if (j == 0) {
                memo_str=cell_str;
            } else if (j == 1) {
                let reYYYYMMDDslash = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
                let reYYYYMMDDhyphen = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
                let reYYYYMMDDslashWithTime = /^(\d{4})\/(\d{1,2})\/(\d{1,2}) \d{1,2}:\d{1,2}:\d{1,2}$/;
                let match;
                if ((match = reYYYYMMDDslash.exec(cell_str)) !== null ||
                    (match = reYYYYMMDDhyphen.exec(cell_str)) !== null ||
                    (match = reYYYYMMDDslashWithTime.exec(cell_str)) !== null) {
                    date_str = match[1] + "-" + zeroPadStr(match[2],2) + "-" + zeroPadStr(match[3],2);
                }
            } else if (j == 2) {
                if ( /^\d{1,}$/.test(cell_str) ||
                     /^\d{1,}\.\d{1,}$/.test(cell_str) ) {
                    price_str = cell_str;
                }
            } else if (j == 3 && /^(-{0,1})(\d{1,}\.\d{1,})$/.test(cell_str)) {
                if (cell_str[0] == '-') { buysell_str = "sell" };
                unit_str = cell_str.replace("-","");
            } else if (j == 4) {
                if (/^\d{1,}$/.test(cell_str) ||
                    /^\d{1,}\.\d{1,}$/.test(cell_str)) {
                    fee_str = parseFloat(cell_str).toFixed(2);
                }
            }
            if (4 <= j && date_str != "" && unit_str != "" && price_str != "" /* && fee_str != "" */) {
                //addnewrowStr+="addNewRow(-1,\""+date_str+"\",\""+buysell_str+"\","+price_str+","+unit_str+");\n";
                addNewRow(-1, memo_str, date_str, buysell_str, price_str, unit_str, fee_str);
                validline=true;
                break;
            }                    
        }
        if (!validline) { console.log(dataString[i]); }
        console.log(date_str + " | " + buysell_str + " | " + price_str + " | " + unit_str + " | " + fee_str);
    }
}


function writeTSV(content, filename, contentType)
{
    let txt_l = document.getElementById("export_long").textContent.replaceAll(' ','\t');
    let txt_s = document.getElementById("export_short").textContent.replaceAll(' ','\t');
    let txt_h = "-\t-\tSold Date\tPurchase Date\tQty\tProceed\tCost\tGain/Loss\n";
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
    var TCA = readTable();
    for (const sell of TCA.sells) {
        for (const buy of TCA.buys) {
            var unit = 0;
            if (buy.unit == 0    /* already taken for calc */ ||
                sell.ds < buy.ds /* buy is newer */) {
                continue;
            } else if (sell.unit <= buy.unit) {
                buy.unit = (( buy.unit * MCT.MAD - sell.unit * MCT.MAD ) / MCT.MAD).toFixed(8);
                unit = sell.unit; sell.unit = 0;
            } else /* buy.unit < sell.unit */ {
                sell.unit = (( sell.unit * MCT.MAD - buy.unit * MCT.MAD ) / MCT.MAD).toFixed(8);
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

    var expo_ = sell.memo + ' ' + buy.memo + ' ' +
        convDateStr(sell.date) + ' ' + convDateStr(buy.date) + ' ' + unit + ' ' +
        (sell.price * unit - sell_fee).toFixed(2) + ' ' +
        (buy.price  * unit + buy_fee).toFixed(2) + ' ' +
        ((sell.price - buy.price) * unit - sell_fee - buy_fee).toFixed(2) + '\n<br>';
    
    return { gain: gain_, fmla: fmla_, expo: expo_ };
}

function convDateStr(dateStr) {
    let ret = "";
    let match;
    let reYYYYMMDDslash = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
    let reYYYYMMDDhyphen = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if ((match = reYYYYMMDDslash.exec(dateStr)) !== null ||
        (match = reYYYYMMDDhyphen.exec(dateStr)) !== null) {
        ret = zeroPadStr(match[2],2) + "-" + zeroPadStr(match[3],2) + "-" + match[1];
    } else {
        console.error(dateStr);
        throw 'Wrong date string format (must YYYY/MM/DD)'
    }
    return ret;
}

function addNewRow(index, memo, date, buysell, price, unit, fee) {
    var tbody = document.getElementById("tbody");
    var row = tbody.insertRow( index );
    
    // Index
    var cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode("9999"));
    cell.style.foregroundColor = "#bbb";
    cell.style.textAlign = "right";
    cell.setAttribute("memo", memo);
    
    // Date
    var cell = row.insertCell(-1);
    var input = doce( 'input' );
    input.type = "date";
    input.style.textAlign = "right";
    input.style.fontSize = 12;
    if (date != "") input.value = date;
    cell.appendChild(input);
    cell.style.backgroundColor = "#bbb";

    // Buy/Sell
    var select = doce( 'select' );
    var optionBuy  = doce( 'option' );
    optionBuy.value = "buy";
    optionBuy.appendChild(document.createTextNode("Buy"));
    select.appendChild( optionBuy );
    var optionSell = doce( 'option' );
    optionSell.value = "sell";
    optionSell.appendChild(document.createTextNode("Sell"));
    select.appendChild( optionSell );
    select.style.fontSize = 12;
    row.insertCell(-1).appendChild( select );
    if (buysell != "") select.value = buysell;

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
    cell.appendChild(input);
    if (unit != "") input.value = unit;

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
        addNewRow(this.parentElement.parentElement.rowIndex, "", "buy", 0, 0);
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

function readTable() {
    var TCA = {}; TCA.buys = []; TCA.sells = [];
    var tbl = document.getElementById("table");
    if (tbl == null) { throw "no table"; }
    for (const row of tbl.rows) {
        if (row.cells[0].firstChild == null) { continue; /*thead*/ }
        var act = {}; var ta;
        for (const cell of row.cells) {
            var val = cell.firstChild.value, cidx = cell.cellIndex;//index of the cells
            if      (cidx == 0) { act.index = cell.firstChild.textContent; act.memo = cell.getAttribute('memo');}
            else if (cidx == 1) { ymd = getYYYYMMDD(val); act.ds = (+new Date(ymd[0],ymd[1],ymd[2])); act.date = val; }
            else if (cidx == 2) { (val == "buy") ? ta = TCA.buys : ta = TCA.sells; }
            else if (cidx == 3) { act.price=val; }
            else if (cidx == 4) { act.unit=act.unit0=val; }
            else if (cidx == 5) {
                act.fee = 0;
                let textcon = cell.firstChild.textContent;
                if (0 < textcon.length ) { act.fee=parseFloat(textcon); }
            }
        }
        ta.push(act);
    }
    
    // sort array
    TCA.buys.sort(function(a,b)  { return ((a.ds == b.ds) ? (a.index - b.index) : (a.ds - b.ds)) }); 
    TCA.sells.sort(function(a,b) { return a.ds - b.ds});

    return TCA;
}

function clearTable() {
    var tbl = document.getElementById("table");
    if (tbl.rows.length < 3) return;
    for (var i = tbl.rows.length - 1; 0 < i; i--) {
        var row = tbl.rows[i];
        row.parentNode.removeChild(row);
        console.log(i);
    }
    updateTableIndexes();
}

function clearCostInfo() {
    var tbl = document.getElementById("table");
    for (var i = 1/*0:thead*/; i < tbl.rows.length; i++) {
        tbl.rows[i].cells[6].firstChild.innerHTML = "";
    }
}

function updateTableIndexes() {
    // read data from table
    var tbl = document.getElementById("table");
    if (tbl == null) { console.error("no table"); }
    for (var i = 1/*0:thead*/; i < tbl.rows.length; i++) {
        tbl.rows[i].cells[0].firstChild.nodeValue = i;
    }
}

function addCostInfo(buy, sell, units, gain, fmla) {
    var tbl = document.getElementById("table");
    for (const row of tbl.rows) {
        if (row.cells[0].firstChild != null /*thead*/ &&
            sell.index == row.cells[0].firstChild.textContent) {
            row.cells[6].firstChild.innerHTML += ' ' +
                buy.date + (isLong(buy.ds, sell.ds) ? '(L)' : '(S)') + ' ' +
                gain.toFixed(2) + ' = ' + fmla.slice(0, -2) + "<br>";
            return;
        }
    }
    throw 'No associated sell found';
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

function getYYYYMMDD(inStr) {
    const parts = inStr.split('-');
    if (parts.length == 3) {
        return [parseInt(parts[0]),parseInt(parts[1]),parseInt(parts[2])];
    } else {
        throw 'date str not including all of YYYY MM DD';
    }
}

function isLong(ts1,ts2) {
    //TODO: use Date operation instead of fixed millisec below.
    return (31536000000 < (ts2 - ts1));
}
