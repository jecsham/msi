import convert from "convert";

const _formatCpu = (jsonData: any) => {
  let formattedContent = jsonData.map((e: any) =>
    e.Name.replace("(R)", "®").replace("(TM)", "™")
  );
  return formattedContent;
};

const _formatGpu = (jsonData: any) => {
  let formattedContent = jsonData.map((e: any) => e.Name);
  return formattedContent;
};

const _formatRam = (jsonData: any) => {
  let formattedContent = jsonData.map((e: any) => {
    let orgSize = convert(e.Capacity, "bytes").to("best");
    let quantity = Number(orgSize.quantity).toFixed(0);
    let unit = orgSize.unit.replace("i", "");
    return `${quantity} ${unit} ${
      e.ConfiguredClockSpeed && e.ConfiguredClockSpeed === e.Speed
        ? e.Speed
        : `${e.ConfiguredClockSpeed}/${e.Speed}`
    } MHz | ${e.Manufacturer}`;
  });
  return formattedContent;
};

const _formatDisk = (jsonData: any) => {
  let formattedContent = jsonData.map((e: any) => {
    let orgSize = convert(e.Size, "bytes").to("best");
    let quantity = Number(orgSize.quantity).toFixed(2);
    let unit = orgSize.unit.replace("i", "");
    return `${quantity} ${unit} | ${e.Caption}`;
  });
  return formattedContent;
};

const _formatMotherboard = (jsonData: any) => {
  let formattedContent = jsonData.map(
    (e: any) => `${e.Product} - ${e.Manufacturer}`
  );
  return formattedContent;
};

const _formatOs = (jsonData: any) => {
  let formattedContent = jsonData.map((e: any) => `${e.Caption}`);
  return formattedContent;
};

const dataStandardFormat = (jsonData: any) => {
  let formattedContent = [
    {
      title: "CPU",
      content: _formatCpu(jsonData.cpu),
    },
    {
      title: "GPU",
      content: _formatGpu(jsonData.gpu),
    },
    {
      title: "RAM",
      content: _formatRam(jsonData.ram),
    },
    {
      title: "STORAGE",
      content: _formatDisk(jsonData.disk),
    },
    {
      title: "MOTHERBOARD",
      content: _formatMotherboard(jsonData.motherboard),
    },
    {
      title: "OS",
      content: _formatOs(jsonData.os),
    },
  ];
  return formattedContent;
};

export { dataStandardFormat };
