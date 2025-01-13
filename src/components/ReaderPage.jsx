import { useState } from "react";
import { ReactReader } from "react-reader";

export const ReaderPage = () => {
  const [location, setLocation] = useState(0);
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url="https://react-reader.metabits.no/files/alice.epub"
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
      />
    </div>
  );
};
