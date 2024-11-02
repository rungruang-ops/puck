import React from "react";
import { ComponentConfig } from "@/core/types";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { DropZone } from "@/core/components/DropZone";
import { Section } from "../../components/Section";

const getClassName = getClassNameFactory("Flex", styles);

export type FlexProps = {
  justifyContent: "start" | "center" | "end";
  direction: "row" | "column";
  gap: number;
  wrap: "wrap" | "nowrap";
};

export const Flex: ComponentConfig<FlexProps> = {
  fields: {
    justifyContent: {
      label: "Justify Content",
      type: "radio",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
      ],
    },
    direction: {
      label: "Direction",
      type: "radio",
      options: [
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
      ],
    },
    gap: {
      label: "Gap",
      type: "number",
      min: 0,
    },
    wrap: {
      label: "Wrap",
      type: "radio",
      options: [
        { label: "true", value: "wrap" },
        { label: "false", value: "nowrap" },
      ],
    },
  },
  defaultProps: {
    justifyContent: "start",
    direction: "row",
    gap: 24,
    wrap: "wrap",
  },
  render: ({ justifyContent, direction, gap, wrap }) => {
    return (
      <Section>
        <DropZone
          className={getClassName()}
          style={{
            justifyContent,
            flexDirection: direction,
            gap,
            flexWrap: wrap,
          }}
          zone="flex"
          disallow={["GridItem"]}
        />
      </Section>
    );
  },
};
