import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaTrash } from "react-icons/fa6";
import PropTypes from "prop-types";
import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const NavBar = ({
  page,
  size,
  changeSize,
  toggleDrawer,
  isOpen,
  selections,
  toggleExpand,
  expandedIndices,
  renditionRef,
  setSelections,
}) => {
  const [mobileDrawer, setMobileDrawer] = React.useState(false);
  console.log(mobileDrawer, "mobileDrawer");

  return (
    <>
      {/* Medium to Large Device */}
      <div className="w-full hidden md:flex items-center justify-between py-3 px-6 border">
        <div>Brand Name</div>

        <div className="flex items-center gap-4">
          {/* Page Number */}
          <div className="">{page}</div>
          {/* Resize Button */}
          <div className="border flex items-center justify-between">
            <button
              className="px-3 py-1 rounded-l-sm bg-slate-200 hover:bg-slate-300"
              onClick={() => changeSize(Math.max(80, size - 10))}
            >
              -
            </button>
            <span>{size}%</span>
            <button
              className="px-3 py-1 rounded-r-sm bg-slate-200 hover:bg-slate-300"
              onClick={() => changeSize(Math.min(130, size + 10))}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <button
            className="hover:text-blue-500 transition-all duration-200"
            onClick={toggleDrawer}
          >
            Highlight
          </button>
        </div>
      </div>

      {/* Small Device */}
      <div className="w-full flex md:hidden items-center justify-between py-3 px-6 border">
        <div>Brand Name</div>

        {/* Page Number */}
        <div className="">{page}</div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setMobileDrawer((prevState) => !prevState);
            }}
          >
            <CiMenuFries />
          </button>
        </div>
      </div>

      {/*Highlight Drawer (Large Device)*/}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        size={450}
        direction="right"
        className="overflow-y-auto"
      >
        {/* Highlighted Texts */}
        <div className="w-full">
          <h1 className="text-2xl font-semibold py-6 px-4">Highlight</h1>
          <ul className="w-full flex flex-col gap-4">
            {selections.map(({ text, cfiRange }, i) => {
              const isExpanded = expandedIndices.includes(i);
              const displayText = isExpanded
                ? text
                : text.slice(0, 100) + "...";

              return (
                <li key={i} className="mx-4 p-4 rounded-md bg-rose-100">
                  <span>
                    {displayText}
                    {text.length > 100 && (
                      <button
                        className="ml-2 text-blue-600 hover:underline"
                        onClick={() => toggleExpand(i)}
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </span>
                  <div className="flex flex-row justify-end gap-4">
                    <button
                      onClick={() => {
                        renditionRef.current.display(cfiRange);
                      }}
                      className="py-1 px-2 rounded bg-cyan-700 hover:bg-cyan-600 text-white"
                    >
                      Show
                    </button>
                    <button
                      onClick={() => {
                        renditionRef.current.annotations.remove(
                          cfiRange,
                          "highlight"
                        );
                        setSelections(selections.filter((item, j) => j !== i));
                      }}
                    >
                      <FaTrash className="text-red-500 hover:text-red-400" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        open={mobileDrawer}
        onClose={() => {
          setMobileDrawer((prevState) => !prevState);
        }}
        direction="right"
        className="overflow-y-auto"
      >
        <div className="">
          {/* Resize Button */}
          <div className="w-full">
            <div className="flex justify-between items-center py-6 px-4">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <button
                onClick={() => {
                  setMobileDrawer((prevState) => !prevState);
                }}
              >
                <IoMdCloseCircleOutline size={24} />
              </button>
            </div>

            {/* Size */}
            <div className="px-4">
              <p className="font-medium">Size</p>
              <div className="border flex items-center justify-between">
                <button
                  className="px-3 py-1 rounded-l-sm bg-slate-200 hover:bg-slate-300"
                  onClick={() => changeSize(Math.max(80, size - 10))}
                >
                  -
                </button>
                <span>{size}%</span>
                <button
                  className="px-3 py-1 rounded-r-sm bg-slate-200 hover:bg-slate-300"
                  onClick={() => changeSize(Math.min(130, size + 10))}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Highlighted Texts */}
          <div className="w-full">
            <h1 className="text-2xl font-semibold py-6 px-4">Highlight</h1>
            <ul className="w-full flex flex-col gap-4">
              {selections.map(({ text, cfiRange }, i) => {
                const isExpanded = expandedIndices.includes(i);
                const displayText = isExpanded
                  ? text
                  : text.slice(0, 100) + "...";

                return (
                  <li key={i} className="mx-4 p-4 rounded-md bg-rose-100">
                    <span>
                      {displayText}
                      {text.length > 100 && (
                        <button
                          className="ml-2 text-blue-600 hover:underline"
                          onClick={() => toggleExpand(i)}
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </span>
                    <div className="flex flex-row justify-end gap-4">
                      <button
                        onClick={() => {
                          renditionRef.current.display(cfiRange);
                        }}
                        className="py-1 px-2 rounded bg-cyan-700 hover:bg-cyan-600 text-white"
                      >
                        Show
                      </button>
                      <button
                        onClick={() => {
                          renditionRef.current.annotations.remove(
                            cfiRange,
                            "highlight"
                          );
                          setSelections(
                            selections.filter((item, j) => j !== i)
                          );
                        }}
                      >
                        <FaTrash className="text-red-500 hover:text-red-400" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
};

NavBar.propTypes = {
  page: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  changeSize: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  selections: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      cfiRange: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleExpand: PropTypes.func.isRequired,
  expandedIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  renditionRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  setSelections: PropTypes.func.isRequired,
};
