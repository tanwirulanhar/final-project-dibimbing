/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import Carousel from 'react-material-ui-carousel';
import { Paper, Grid } from '@mui/material';
import useGetData from '../hooks/useGatedata';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const { getData } = useGetData();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData("banners");
      if (res && res.data) {
        setBanners(res.data.data);
      }
    };

    fetchData();
  }, [getData])

  return (
    <div css={mainContainer}>
      <h1 className="pt-8 mb-4 text-3xl font-bold text-center text-green-800">Highlight Destination</h1>
      <p className="mb-16 font-semibold text-center text-green-600">"Discover Your Dream Destinations"</p>
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
              <Grid item xs={12} sm={6} md={4} key={item.id}>
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
  padding: 20px 10px;
  @media (min-width: 640px) {
    padding: 40px 20px;
  }
`;

const itemPaper = css`
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05) translateY(-5px);
  }
  border-radius: 16px;
  text-align: center;
  margin-bottom: 16px;
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
