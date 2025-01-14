import React from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";

export const ReaderPage = () => {
  const [location, setLocation] = React.useState(0);
  const [firstRenderDone, setFirstRenderDone] = React.useState(false);
  const [page, setPage] = React.useState("");
  const [size, setSize] = React.useState(100);

  const tocRef = React.useRef(null);
  const renditionRef = React.useRef(null);

  const locationChanged = (epubcifi) => {
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start;
      const chapter = tocRef.current.find((item) => item.href === href);
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : "n/a"
        }`
      );

      localStorage.setItem("book-progress", epubcifi);
      setLocation(epubcifi);
    }

    if (!firstRenderDone) {
      setLocation(localStorage.getItem("book-progress"));
      setFirstRenderDone(true);
      return;
    }
  };

  const changeSize = (newSize) => {
    setSize(newSize);
  };
  React.useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);

  const ownStyles = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      color: "red",
      top: "90%",
    },
  };

  console.log(ownStyles);
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        title="New Book"
        url="https://react-reader.metabits.no/files/alice.epub"
        location={location}
        locationChanged={locationChanged}
        getRendition={(rendition) => {
          renditionRef.current = rendition;
          renditionRef.current.themes.fontSize(`${size}%`);
        }}
        readerStyles={ownStyles}
        tocChanged={(toc) => (tocRef.current = toc)}
      />

      <div className="bg-rose-300 flex">
        <div
        // style={{
        //   position: "absolute",
        //   bottom: "1rem",
        //   right: "1rem",
        //   left: "1rem",
        //   textAlign: "center",
        //   zIndex: 1,
        // }}
        >
          {page}
        </div>

        <div
        // style={{
        //   position: "absolute",
        //   bottom: "1rem",
        //   right: "1rem",
        //   left: "1rem",
        //   textAlign: "center",
        //   zIndex: 1,
        // }}
        >
          <button onClick={() => changeSize(Math.max(80, size - 10))}>-</button>
          <span>Current size: {size}%</span>
          <button onClick={() => changeSize(Math.min(130, size + 10))}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};
