/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from 'react-material-ui-carousel';
import { Paper, Grid } from '@mui/material';

const Banner = () => {
  const [banners, setBanners] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners`,
        {
          headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
        }
      );
      console.log(res?.data?.data);
      setBanners(res?.data?.data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div css={mainContainer}>
      <h1 className="pt-10 mb-4 text-3xl font-bold text-center text-green-800">Highlight Destination</h1>
      <p className='mb-16 font-semibold text-center text-green-600 '>"Discover Your Dream Destinations"</p>
      <Carousel
        indicators={false}
        navButtonsAlwaysVisible={true}
        autoPlay={false}
        navButtonsProps={{
          style: {
            top: '10%',  // Mengatur posisi vertikal
            zIndex: 100, // Menempatkan tombol navigasi di atas konten
          }
        }}
      >
        {chunkArray(banners, 3).map((chunk, index) => (
          <Grid container spacing={4} key={index} justifyContent="center">
            {chunk.map((item) => (
              <Grid item key={item.id}>
                <Item item={item} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Carousel>
    </div>
  );
};

const Item = (props) => {
  return (
    <Paper css={itemPaper}>
      <img css={itemImage} src={props.item.imageUrl} alt={props.item.name} />
      <h1 css={itemName}>{props.item.name}</h1>
    </Paper>
  );
}

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const mainContainer = css`

  padding: 40px;
`;

const itemPaper = css`
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05) translateY(-5px);
  }
  border-radius: 16px;
  text-align: center;
  margin-bottom: 32px;
  padding: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const itemImage = css`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const itemName = css`
  margin-top: 16px;
  margin-bottom: 20px;
  color: #2F855A;
  font-size: 15px;
  font-weight: bold;
`;

export default Banner;
