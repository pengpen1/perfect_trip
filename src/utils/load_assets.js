function getAssetURl(imagurl) {
  //  import.meta.url当前文件的地址，基于当前文件地址生成url
  return new URL(`../assets/img/${imagurl}`, import.meta.url).href;
}

export { getAssetURl };
