import _ from "lodash";

import i18n from "../i18n";
import { Nilable } from "../types";

const percentageFormatter: Partial<Record<string, Intl.NumberFormat>> = {
  de: new Intl.NumberFormat("de", { style: "percent", maximumFractionDigits: 2, minimumFractionDigits: 2 }),
};

const numberFormatter: Partial<Record<string, Intl.NumberFormat>> = {
  de: new Intl.NumberFormat("de", { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
};

const intNumberFormatter: Partial<Record<string, Intl.NumberFormat>> = {
  de: new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0, minimumFractionDigits: 0 }),
};

export const formatPercentage = (value: number) => {
  if (!percentageFormatter[i18n.language]) {
    percentageFormatter[i18n.language] = new Intl.NumberFormat(i18n.language, {
      style: "percent",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }

  if (_.isNaN(value)) value = 0;
  // avoid a -0 case, people get confused by this
  if (value === 0) value = 0;

  return percentageFormatter[i18n.language]!.format(value);
};

export const formatNumber = (value: number) => {
  if (!numberFormatter[i18n.language]) {
    numberFormatter[i18n.language] = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }

  if (_.isNaN(value)) value = 0;
  // avoid a -0 case, people get confused by this
  if (value === 0) value = 0;

  return numberFormatter[i18n.language]!.format(value);
};

export const formatIntNumber = (value: number) => {
  if (!intNumberFormatter[i18n.language]) {
    intNumberFormatter[i18n.language] = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }

  if (_.isNaN(value)) value = 0;
  // avoid a -0 case, people get confused by this
  if (value === 0) value = 0;

  return intNumberFormatter[i18n.language]!.format(value);
};

export const formatIntNumberRounded = (value: number) => {
  if (!intNumberFormatter[i18n.language]) {
    intNumberFormatter[i18n.language] = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }

  if (_.isNaN(value)) value = 0;
  value = Math.round(value);
  // avoid a -0 case, people get confused by this
  if (value === 0) value = 0;

  return intNumberFormatter[i18n.language]!.format(value);
};

export const parsedInt = (value: Nilable<string>) => {
  if (!value) {
    throw new Error("Value is not defined");
  }

  const val = parseInt(value, 10);

  if (isNaN(val)) {
    throw new Error("Invalid number");
  }

  return val;
};
