import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";
import InvoiceTableHeader from "./InvoiceTableHeader";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

const InvoiceItemsTable = ({ invoice }: any) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={invoice} />
    <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.length} />
    <InvoiceTableFooter items={invoice} />
  </View>
);

export default InvoiceItemsTable;
