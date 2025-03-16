/* eslint-disable no-unused-vars */
import { Box, Typography, Paper } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import BookCard from '../books/BookCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RecommendationSection = ({ recommendations, loading }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2,
        mb: 4,
        backgroundColor: (theme) => theme.palette.background.paper 
      }}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {recommendations.map((book) => (
          <SwiperSlide key={book.id}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  );
};

export default RecommendationSection; 