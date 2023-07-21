import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const InvoiceFinance = ({ invoice, title, module }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* <Image
        style={styles.logo}
        src={
          "https://i.pinimg.com/originals/77/44/80/7744806c7e15d502830a1fdd8e2a37e9.gif"
        }
      /> */}
      <InvoiceTitle title={title} />
      <InvoiceNo invoice={invoice} />
      {/* <BillTo invoice={invoice} /> */}
      <InvoiceItemsTable invoice={invoice} module={module} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);

export default InvoiceFinance;
