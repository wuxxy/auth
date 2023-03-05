import React from "react";

const Interface = () => {
  const integrations = [
    {
      name: "Dragobyte",
    },
  ];
  return (
    <div className="text-gray-200 flex flex-col w-full h-full items-center justify-center">
      <div className="p-2">Integrations</div>
      <div className="flex flex-row flex-wrap flex-1 w-full p-4">
        {integrations.map((integ, i) => (
          <div key={i} className="ring-1 ring-pink-300 rounded-sm p-4 h-min">
            {integ.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interface;
