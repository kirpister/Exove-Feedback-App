import React, { ReactElement, useState } from "react";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "../component_download/ComponentToPrint";
import styles from "./pdfDownload.module.css";
import { showLoading2s } from "../../../../features/loadingSlicer";
import { useAppDispatch } from "../../../../app/hooks";
interface Props {
  chartElement?: ReactElement;
  tableElement?: ReactElement<{ defaultActiveKey: Array<string> }>;
  feedbackTitle?: string;
  openAll?: VoidFunction;
  closeAll?: VoidFunction;
}
function PdfDownload(props: Props) {
  const componentRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const onBeforeGetContentResolve = React.useRef<(() => void) | null>(null);
  const handleAfterPrint = React.useCallback(() => {
    if (props.closeAll) {
      props.closeAll();
    }
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    if (props.openAll) {
      props.openAll();
    }
    showLoading2s(dispatch);
    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setTimeout(() => {
        showLoading2s(dispatch);
        resolve();
      }, 2000);
    });
  }, []);
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = React.useCallback(() => {
    return <button className={styles.btn}>Print PDF </button>;
  }, []);
  return (
    <div>
      <ComponentToPrint ref={componentRef} chartElement={props.chartElement} tableElement={props.tableElement} />
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle={props.feedbackTitle}
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        trigger={reactToPrintTrigger}
      />
    </div>
  );
}

export default PdfDownload;
