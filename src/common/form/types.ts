export type OptionObj = {
  label: string;
  value: string | boolean | number;
};

export type RangeNum = {
  min: number | null;
  max: number | null;
};

export type RangeDateStr = {
  start: string | null;
  end: string | null;
};

export type RangeDate = {
  start: string | Date | null;
  end: string | Date | null;
};
