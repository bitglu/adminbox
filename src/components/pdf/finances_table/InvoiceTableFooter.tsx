import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ items, module }: any) => {
  const total = items
    .map((item: any) => item.amount)
    .reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0
    );

  const cash = items
    .map((item: any) => {
      if (item.type === "Cash") {
        return item.amount;
      }
    })
    .filter((ele: any) => ele)
    .reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0
    );

  const charge = items
    .map((item: any) => {
      if (item.type === "Charge") {
        return item.amount;
      }
    })
    .filter((ele: any) => ele)
    .reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0
    );

  const credit = items
    .map((item: any) => {
      if (item.type === "Credit") {
        return item.amount;
      }
    })
    .filter((ele: any) => ele)
    .reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0
    );
  return (
    <>
      {module !== "finances" && (
        <View style={styles.row}>
          <Text style={styles.description}>Credit</Text>
          <Text style={styles.total}>
            {Number.parseFloat(credit).toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.description}>Cash</Text>
        <Text style={styles.total}>{Number.parseFloat(cash).toFixed(2)}</Text>
      </View>

      {module !== "finances" && (
        <View style={styles.row}>
          <Text style={styles.description}>Charge</Text>
          <Text style={styles.total}>
            {Number.parseFloat(charge).toFixed(2)}
          </Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>{Number.parseFloat(total).toFixed(2)}</Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
