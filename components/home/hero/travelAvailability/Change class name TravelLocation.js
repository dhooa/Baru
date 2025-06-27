import OutsideClick from "@/components/shared/outsideClick/OutsideClick";
import { addTravelAvailability } from "@/features/travelAvailability/travelAvailabilitySlice";
import React, { useEffect, useState } from "react";
import { BiChevronDown, BiMap } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// Contoh data Kecamatan & Nagari
const kecamatanNagari = [
  {
    id: 1,
    kecamatan: "Sangir Jujuan",
    nagari: [
      { id: 1, name: "Nagari Lubuk Malako" },
      { id: 2, name: "Nagari Sungai Lambai" },
    ],
  },
  {
    id: 2,
    kecamatan: "Sangir",
    nagari: [
      { id: 3, name: "Nagari Abai" },
      { id: 4, name: "Nagari Lubuk Gadang" },
    ],
  },
  {
    id: 3,
    kecamatan: "Sungai Pagu",
    nagari: [
      { id: 5, name: "Nagari Pasar Muara Labuh" },
      { id: 6, name: "Nagari Koto Baru" },
    ],
  },
];

const TravelLocation = () => {
  const travelAvailability = useSelector((state) => state?.travelAvailability);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedNagari, setSelectedNagari] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTravelAvailability({ kecamatan: selectedKecamatan, nagari: selectedNagari }));
  }, [dispatch, selectedKecamatan, selectedNagari]);

  const handleOutsideClick = () => {
    setIsOpen(false);
  };

  const nagariList = kecamatanNagari.find(
    (item) => item.kecamatan === selectedKecamatan
  )?.nagari || [];

  return (
    <section>
      <div className="relative">
        <button
          <span className="flex flex-row gap-x-1 items-center text-sm">
  {selectedNagari ? (
    <>
      {selectedKecamatan} - {selectedNagari}
    </>
  ) : (
    <>
      Pilih Kecamatan / Nagari
      <BiChevronDown />
    </>
  )}
</span>
        

        {isOpen && (
          <div className="absolute top-full left-0 bg-secondary p-2.5 rounded shadow mt-2 z-50 w-52">
            <OutsideClick onOutsideClick={handleOutsideClick}>
              {/* Dropdown Kecamatan */}
              <div className="flex flex-col gap-y-2 mb-2">
                <p className="text-xs font-bold">Pilih Kecamatan:</p>
                {kecamatanNagari.map(({ id, kecamatan }) => (
                  <button
                    key={id}
                    className="text-xs text-left hover:underline"
                    onClick={() => {
                      setSelectedKecamatan(kecamatan);
                      setSelectedNagari("");
                    }}
                  >
                    {kecamatan}
                  </button>
                ))}
              </div>

              {/* Dropdown Nagari */}
              {selectedKecamatan && (
                <div className="flex flex-col gap-y-2">
                  <p className="text-xs font-bold">Pilih Nagari:</p>
                  {nagariList.map(({ id, name }) => (
                    <button
                      key={id}
                      className="text-xs text-left hover:underline"
                      onClick={() => {
                        setSelectedNagari(name);
                        setIsOpen(false);
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </OutsideClick>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelLocation;
