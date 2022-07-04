import { yotsu } from "./yotsubaImg";
import { getId, getId2 } from "./fetchLinks";
import { useRef } from "react";
import Tags from "./Tags";
import useFetch from "./useFetch";
import MangaInfo from "./MangaInfo";

const MangaCard = ({ id }) => {
  const info = useFetch(`${getId}${id}${getId2}`);

  //putting random img number in useRef to avoid rerendering the img on page load
  const random = useRef(Math.floor(Math.random() * yotsu.length));

  //this could use some rewriting to be prettier.
  return (
    <>
      <div className="big-container">
        {info &&
          info.data.data.relationships
            .filter((img) => img.type === "cover_art")
            .map((img) => (
              <img
                key={img.attributes.fileName}
                className="manga-img"
                src={`https://uploads.mangadex.org/covers/${id}/${img.attributes.fileName}.256.jpg`}
                alt="hi"
              />
            ))}
        <img className="random-bg" src={yotsu[random.current]} alt="bg" />
        {info && <MangaInfo manga={info} />}
        <Tags id={info} />
      </div>
    </>
  );
};

export default MangaCard;
