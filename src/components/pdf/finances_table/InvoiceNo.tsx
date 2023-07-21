import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 100,
  },
});

const InvoiceNo = ({ invoice }: any) => (
  <Fragment>
    {/*  <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice No:</Text>
      <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
    </View> */}
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date to export: </Text>
      <Text>{dayjs().format("YYYY-MM-DD")}</Text>
    </View>
  </Fragment>
);

export default InvoiceNo;
