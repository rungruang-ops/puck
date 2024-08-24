import React from "react";
import { ComponentConfig } from "@/core/types";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { DropZone } from "@/core/components/DropZone";
import { Section } from "../../components/Section";

const getClassName = getClassNameFactory("Grid", styles);

export type GridProps = {
  numColumns: number;
};

export const Grid: ComponentConfig<GridProps> = {
  fields: {
    numColumns: {
      type: "number",
      label: "Number of columns",
      min: 1,
      max: 12,
    },
  },
  defaultProps: {
    numColumns: 4,
  },
  render: ({ numColumns }) => {
    return (
      <Section>
        <DropZone
          zone="grid"
          disallow={["Hero"]}
          className={getClassName()}
          style={{
            gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
          }}
        ></DropZone>
      </Section>
    );
  },
};