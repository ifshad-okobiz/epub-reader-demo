import React from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";

export const ReaderPage = () => {
  const [location, setLocation] = React.useState(0);
  const [firstRenderDone, setFirstRenderDone] = React.useState(false);
  const [page, setPage] = React.useState("");
  const [size, setSize] = React.useState(100);
  const [selections, setSelections] = React.useState([]);

  const tocRef = React.useRef(null);
  const renditionRef = React.useRef(null);

  const locationChanged = (epubcifi) => {
    if (!firstRenderDone) {
      setLocation(localStorage.getItem("book-progress"));
      setFirstRenderDone(true);
      return;
    }

    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start;
      const chapter = tocRef.current.find((item) => item.href === href);
      setPage(`Page ${displayed.page} of ${displayed.total} in chapter`);

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

  const ownStyles = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      color: "red",
      top: "90%",
    },
    tocArea: {
      ...ReactReaderStyle.tocArea,
      background: "red",
    },
  };

  console.log(ownStyles);
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        title="New Book"
        url="https://react-reader.metabits.no/files/alice.epub"
        epubInitOptions={{
          openAs: "epub",
        }}
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
        // readerStyles={ownStyles}
        tocChanged={(toc) => (tocRef.current = toc)}
      />

      {/* Page Number */}
      <div className="absolute bottom-4 right-0 z-10">{page}</div>

      {/* Resize Button */}
      <div
      className="absolute top-0 right-0 -translate-x-40 z-10"
      >
        <button
          className="p-3 rounded-sm bg-rose-300"
          onClick={() => changeSize(Math.max(80, size - 10))}
        >
          -
        </button>
        <span>Current size: {size}%</span>
        <button
          className="p-3 rounded-sm bg-green-300"
          onClick={() => changeSize(Math.min(130, size + 10))}
        >
          +
        </button>
      </div>

      {/* Highlghted Texts */}
      <div className="absolute right-0 top-0 z-10">
        Highlights
        <ul>
          {selections.map(({ text, cfiRange }, i) => (
            <li key={i}>
              {text}{" "}
              <button
                onClick={() => {
                  renditionRef.current.display(cfiRange);
                }}
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
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
