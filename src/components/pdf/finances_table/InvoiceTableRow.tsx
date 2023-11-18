import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "60%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },

  amount: {
    width: "20%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ items }: any) => {
  const rows = items.map((item: any) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.description}>{item.type}</Text>
      <Text style={styles.qty}>
        {dayjs(item.created_at).tz("America/Chicago").format("DD MMM hh:mm a")}
      </Text>
      <Text style={styles.amount}>
        {Number.parseFloat(item.amount).toFixed(2)}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
