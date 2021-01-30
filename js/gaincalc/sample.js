function add_sample_data() {
    /*
    addNewRow(-1, "2018-08-08", "buy",   345678, 0.03);
    addNewRow(-1, "2018-08-08", "buy",   345677, 0.3);
    addNewRow(-1, "2018-08-09", "sell",  310000, 0.232);
    */
    addNewRow(-1, "2018-08-16", "buy", 6430.37, 0.00155512);
    addNewRow(-1, "2018-08-28", "buy", 7188.00, 0.00069558);
    addNewRow(-1, "2019-06-13", "buy", 8389.78, 0.01191926);
    addNewRow(-1, "2019-06-13", "buy", 8348.12, 0.02395749);
    addNewRow(-1, "2019-06-14", "buy", 8539.69, 0.03513008);
    addNewRow(-1, "2019-06-14", "buy", 8828.15, 0.04530961);
    addNewRow(-1, "2019-06-15", "buy", 9096.79, 0.05496444);
    addNewRow(-1, "2019-06-16", "buy", 9314.55, 0.06441535);
    addNewRow(-1, "2019-06-17", "buy", 9319.42, 0.0418481);
    addNewRow(-1, "2019-06-21", "buy", 10035.86, 0.0298928);
    addNewRow(-1, "2019-06-22", "buy", 10871.84, 0.06438653);
    addNewRow(-1, "2019-06-24", "buy", 11151.73, 0.06492266);
    addNewRow(-1, "2019-06-25", "buy", 11511.22, 0.04560768);
    addNewRow(-1, "2019-06-26", "buy", 12176.19, 0.02053187);
    addNewRow(-1, "2019-06-28", "buy", 12047.49, 0.02498446);
    addNewRow(-1, "2019-06-29", "buy", 12207.48, 0.05152579);
    addNewRow(-1, "2019-07-01", "buy", 10349.29, 0.06773412);
    addNewRow(-1, "2019-07-02", "buy", 10757.51, 0.04666507);
    addNewRow(-1, "2019-07-04", "buy", 12003.06, 0.02532687);
    addNewRow(-1, "2019-07-05", "buy", 11345.13, 0.02688378);
    addNewRow(-1, "2019-07-08", "buy", 12034.38, 0.05883145);
    addNewRow(-1, "2019-07-09", "buy", 12722.42, 0.04000811);
    addNewRow(-1, "2019-07-10", "buy", 12430.82, 0.02493802);
    addNewRow(-1, "2019-07-11", "buy", 11527.30, 0.05300461);
    addNewRow(-1, "2019-07-11", "sell", 11173.02, 0.22375329);
    addNewRow(-1, "2019-07-14", "buy", 10088.98, 0.05104579);
    addNewRow(-1, "2019-07-16", "buy", 9753.54, 0.10426983);
    addNewRow(-1, "2019-07-16", "buy", 9674.30, 0.09478722);
    addNewRow(-1, "2019-07-18", "buy", 10733.76, 0.06679859);
    addNewRow(-1, "2019-07-19", "buy", 10545.32, 0.04921615);
    addNewRow(-1, "2019-07-23", "sell", 10065.22, 0.05196111);
    addNewRow(-1, "2019-07-26", "sell", 10014.90, 0.1797322);
    addNewRow(-1, "2019-08-13", "sell", 10672.86, 0.16987012);
    addNewRow(-1, "2019-08-15", "sell", 10257.48, 0.07945421);
    addNewRow(-1, "2019-09-12", "buy", 10516.79, 0.23771512);
    addNewRow(-1, "2019-09-24", "buy", 8554.34, 0.23379945);
    addNewRow(-1, "2019-09-26", "buy", 8009.27, 0.06242766);
    addNewRow(-1, "2019-10-16", "buy", 8060.88, 0.06401286);
    addNewRow(-1, "2019-11-02", "sell", 9230.63, 0.19500294);
    addNewRow(-1, "2019-12-02", "sell", 7314.58, 0.21901463);
    addNewRow(-1, "2019-12-04", "sell", 7491.21, 0.24081557);
    addNewRow(-1, "2019-12-22", "sell", 7598.11, 0.10528934);
    addNewRow(-1, "2019-12-29", "sell", 7419.36, 0.1117347);
    addNewRow(-1, "2020-01-29", "sell", 9363.40, 0.0992161);
    addNewRow(-1, "2020-02-24", "buy", 9575.64, 0.0939885);
    addNewRow(-1, "2020-02-26", "buy", 8808.18, 0.05971722);
    addNewRow(-1, "2020-03-04", "buy", 8887.15, 0.09384336);
    addNewRow(-1, "2020-03-06", "buy", 9092.53, 0.10294165);
    addNewRow(-1, "2020-03-07", "buy", 8734.91, 0.07292577);
    addNewRow(-1, "2020-03-11", "buy", 7364.66, 0.05747991);
    addNewRow(-1, "2020-03-12", "buy", 4861.80, 0.0869102);
    addNewRow(-1, "2020-04-06", "sell", 7283.94, 0.10983067);
    addNewRow(-1, "2020-05-21", "buy", 9071.30, 0.00323107);
    addNewRow(-1, "2020-05-22", "buy", 9244.07, 0.00317068);
    addNewRow(-1, "2020-05-23", "buy", 9167.50, 0.00533079);
    addNewRow(-1, "2020-05-24", "buy", 8883.47, 0.0055001);
    addNewRow(-1, "2020-05-24", "buy", 8783.48, 0.0559152);
    addNewRow(-1, "2020-05-25", "buy", 8825.47, 0.00553738);
    addNewRow(-1, "2020-05-26", "buy", 8776.92, 0.00556801);
    addNewRow(-1, "2020-05-27", "buy", 9178.83, 0.00532421);
    addNewRow(-1, "2020-05-28", "buy", 9468.36, 0.0051614);
    addNewRow(-1, "2020-05-29", "buy", 9414.21, 0.00519109);
    addNewRow(-1, "2020-05-30", "buy", 9541.27, 0.00512196);
    addNewRow(-1, "2020-05-31", "buy", 9518.71, 0.0051341);
    addNewRow(-1, "2020-06-01", "buy", 9567.44, 0.00510795);
    addNewRow(-1, "2020-06-02", "buy", 9444.39, 0.0051745);
    addNewRow(-1, "2020-06-03", "buy", 9575.14, 0.00510384);
    addNewRow(-1, "2020-06-04", "buy", 9800.48, 0.00498649);
    addNewRow(-1, "2020-06-05", "buy", 9731.76, 0.0050217);
    addNewRow(-1, "2020-06-06", "buy", 9644.95, 0.0050669);
    addNewRow(-1, "2020-06-07", "buy", 9477.87, 0.00515622);
    addNewRow(-1, "2020-06-08", "buy", 9673.72, 0.00505183);
    addNewRow(-1, "2020-06-09", "buy", 9720.81, 0.00502736);
    addNewRow(-1, "2020-06-10", "buy", 9771.03, 0.00500152);
    addNewRow(-1, "2020-06-11", "buy", 9449.87, 0.0051715);
    addNewRow(-1, "2020-06-12", "buy", 9413.25, 0.00519162);
    addNewRow(-1, "2020-06-13", "buy", 9432.51, 0.00518208);
    addNewRow(-1, "2020-06-14", "buy", 9399.20, 0.00519938);
    addNewRow(-1, "2020-06-15", "buy", 9352.22, 0.0052255);
    addNewRow(-1, "2020-06-16", "buy", 9502.75, 0.00514272);
    addNewRow(-1, "2020-06-17", "buy", 9372.23, 0.00521434);
    addNewRow(-1, "2020-06-18", "buy", 9387.41, 0.00520591);
    addNewRow(-1, "2020-06-18", "buy", 9384.99, 0.01041344);
    addNewRow(-1, "2020-06-19", "buy", 9321.47, 0.0104844);
    addNewRow(-1, "2020-06-20", "buy", 9264.88, 0.01054844);
    addNewRow(-1, "2020-06-21", "buy", 9342.81, 0.01046045);
    addNewRow(-1, "2020-06-22", "buy", 9570.73, 0.01021134);
    addNewRow(-1, "2020-06-23", "buy", 9661.14, 0.01011578);
    addNewRow(-1, "2020-06-24", "buy", 9295.81, 0.01051334);
    addNewRow(-1, "2020-06-25", "buy", 9284.59, 0.01052604);
    addNewRow(-1, "2020-06-26", "buy", 9127.38, 0.01070734);
    addNewRow(-1, "2020-06-27", "buy", 9066.97, 0.01077758);
    addNewRow(-1, "2020-06-28", "buy", 9141.11, 0.01069126);
    addNewRow(-1, "2020-06-29", "buy", 9102.53, 0.01073658);
    addNewRow(-1, "2020-06-30", "buy", 9159.60, 0.01067077);
    addNewRow(-1, "2020-07-01", "buy", 9289.87, 0.01052006);
    addNewRow(-1, "2020-07-02", "buy", 8974.42, 0.01088984);
    addNewRow(-1, "2020-07-03", "buy", 9092.13, 0.01074886);
    addNewRow(-1, "2020-07-04", "buy", 9070.19, 0.01077596);
    addNewRow(-1, "2020-07-05", "buy", 9033.92, 0.01081812);
    addNewRow(-1, "2020-07-06", "buy", 9311.42, 0.01049571);
    addNewRow(-1, "2020-07-07", "buy", 9262.57, 0.01055215);
    addNewRow(-1, "2020-07-08", "buy", 9418.15, 0.01037677);
    addNewRow(-1, "2020-07-09", "buy", 9199.85, 0.010623);
    addNewRow(-1, "2020-07-10", "buy", 9220.49, 0.01059922);
    addNewRow(-1, "2020-07-11", "buy", 9215.26, 0.01060524);
    addNewRow(-1, "2020-10-21", "sell", 12903.27, 0.12399958);
    addNewRow(-1, "2020-11-01", "sell", 13844.25, 0.0795276);
    addNewRow(-1, "2020-11-02", "sell", 13398.76, 0.04567587);
    addNewRow(-1, "2020-11-11", "sell", 15798.23, 0.05133486);
    addNewRow(-1, "2020-11-17", "sell", 18401.21, 0.07157138);
    addNewRow(-1, "2020-12-05", "sell", 19112.98, 0.04735002);
    addNewRow(-1, "2020-12-13", "sell", 19115.96, 0.0544048);
    addNewRow(-1, "2020-12-16", "sell", 20812.66, 0.04401167);
    addNewRow(-1, "2020-12-17", "sell", 23529.80, 0.05172165);
    addNewRow(-1, "2020-12-27", "sell", 28224.98, 0.02575733);
    addNewRow(-1, "2020-12-30", "sell", 28863.05, 0.01836258);
    addNewRow(-1, "2021-01-02", "sell", 33165.48, 0.03322732);
    addNewRow(-1, "2021-01-06", "sell", 36226.38, 0.03053024);
}
