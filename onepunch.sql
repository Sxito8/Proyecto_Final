-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2024 a las 05:54:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `onepunch`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hero`
--

CREATE TABLE `hero` (
  `HeroRank` varchar(50) NOT NULL,
  `Class` varchar(20) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hero`
--

INSERT INTO `hero` (`HeroRank`, `Class`, `Name`, `id`) VALUES
('1', 'Clase-S', 'Saitamaa', 1),
('7', 'Clase-S', 'King', 2),
('14', 'Clase-S', 'Genos', 3),
('2', 'Clase-S', 'Tornado', 4),
('3', 'Clase-S', 'Silver Fang', 5),
('4', 'Clase-S', 'Atomic samurai', 6),
('5', 'Clase-S', 'Kind Emperor', 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `hero`
--
ALTER TABLE `hero`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `hero`
--
ALTER TABLE `hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
