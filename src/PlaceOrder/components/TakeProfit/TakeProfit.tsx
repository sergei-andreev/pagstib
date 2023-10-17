/* eslint @typescript-eslint/no-use-before-define: 0 */
import React from "react";
import { QuestionTooltip, Switch } from "components";
import { Typography } from "@material-ui/core";

import styles from "./TakeProfit.module.scss";

const TakeProfit = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.row}>
          <QuestionTooltip message="Market direction description" />
          <Typography variant="body1">Take Profit</Typography>
        </div>

        <Switch />
      </div>

      {/* <div>Table</div> */}
    </div>
  );
};

export { TakeProfit };
