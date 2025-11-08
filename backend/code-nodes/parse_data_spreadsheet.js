const items = $input.all();
const currentTime = new Date();
const currentMinute = currentTime.getMinutes();

const result = items.map((item, index) => {
  const menitSebelum = parseInt(item.json["Pengingat Sebelum (menit)"]) || 0;
  const interval = parseInt(item.json["Interval (menit)"]) || 0;

  const shouldTrigger =
    currentMinute >= menitSebelum - interval && currentMinute <= menitSebelum;

  return {
    json: {
      ...item.json, // simpan semua data dari sheet
      currentMinute,
      menitSebelum,
      interval,
      shouldTrigger,
    },
    pairedItem: item.pairedItem ?? [{ item: index }],
  };
});

return result;
