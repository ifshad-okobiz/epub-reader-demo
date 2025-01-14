import React from "react";
import { ReactReader } from "react-reader";
import { NavBar } from "./NavBar";

export const ReaderPage = () => {
  const [location, setLocation] = React.useState(0);
  const [firstRenderDone, setFirstRenderDone] = React.useState(false);
  const [page, setPage] = React.useState("");
  const [size, setSize] = React.useState(100);
  const [selections, setSelections] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedIndices, setExpandedIndices] = React.useState([]);


  const tocRef = React.useRef(null);
  const renditionRef = React.useRef(null);

  const toggleExpand = (index) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const locationChanged = (epubcifi) => {
    if (!firstRenderDone) {
      setLocation(localStorage.getItem("book-progress"));
      setFirstRenderDone(true);
      return;
    }

    if (renditionRef.current && tocRef.current) {
      const { displayed } = renditionRef.current.location.start;
      setPage(`Page ${displayed.page} of ${displayed.total}`);
      localStorage.setItem("book-progress", epubcifi);
      setLocation(epubcifi);
    }
  };

  const changeSize = (newSize) => {
    setSize(newSize);
  };

  React.useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);

      function setRenderSelection(cfiRange, contents) {
        setSelections(
          selections.concat({
            text: renditionRef.current.getRange(cfiRange).toString(),
            cfiRange,
          })
        );
        renditionRef.current.annotations.add(
          "highlight",
          cfiRange,
          {},
          null,
          "hl",
          { fill: "red", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
        );
        contents.window.getSelection().removeAllRanges();
      }
      renditionRef.current.on("selected", setRenderSelection);
      return () => {
        renditionRef.current.off("selected", setRenderSelection);
      };
    }
  }, [size, setSelections, selections]);

  return (
    <div style={{ height: "100vh" }}>
      <NavBar
        page={page}
        size={size}
        changeSize={changeSize}
        toggleDrawer={toggleDrawer}
        isOpen={isOpen}
        selections={selections}
        toggleExpand={toggleExpand}
        expandedIndices={expandedIndices}
        renditionRef={renditionRef}
        setSelections={setSelections}
      />
      <ReactReader
        title="New Book"
        url="https://react-reader.metabits.no/files/alice.epub"
        location={location}
        locationChanged={locationChanged}
        getRendition={(rendition) => {
          renditionRef.current = rendition;
          renditionRef.current.themes.fontSize(`${size}%`);
          renditionRef.current.themes.default({
            "::selection": {
              background: "orange",
            },
          });
          setSelections([]);
        }}
        tocChanged={(toc) => (tocRef.current = toc)}
      />
    </div>
  );
};
