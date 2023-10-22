export type WrapperResponse<T> = Promise<{
  data: T;
}>;

export type Option = {
  label?: string;
  value?: string;
};

export type CompareLayerRequestParams = {
  layerFirstId: string;
  layerSecondId: string;
};
