-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th4 21, 2026 lúc 04:20 PM
-- Phiên bản máy phục vụ: 8.4.7
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dbshop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `size_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `size_id`) VALUES
(14, 9, 4, 1, 1),
(15, 10, 7, 1, 1),
(24, 7, 5, 15, 0),
(25, 7, 1, 3, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Áo'),
(2, 'Quần'),
(3, 'Váy'),
(4, 'Phụ kiện');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','paid','shipping','completed','cancel') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `fullname`, `phone`, `address`, `email`, `total_price`, `created_at`, `status`) VALUES
(1, NULL, '', '', '', '', 150000.00, '2025-12-20 01:21:13', 'pending'),
(2, NULL, '', '', '', '', 150000.00, '2025-12-20 01:24:26', 'pending'),
(3, 7, '', '', '', '', 3750000.00, '2025-12-20 01:50:40', 'pending'),
(4, 7, '', '', '', '', 3750000.00, '2025-12-20 01:50:51', 'pending'),
(5, 7, 'Trang Mạnh Phúc', '0777508199', 'khu phố 3 - Phường Bình Trị Đông A - Quận Bình Tân', 'manhphuc0503@gmail.com', 3750000.00, '2025-12-20 01:51:01', 'pending'),
(6, 7, 'Trang Mạnh Phúc', '0777508199', 'khu phố 3 - Phường Bình Trị Đông A - Quận Bình Tân', 'manhphuc0503@gmail.com', 3750000.00, '2025-12-20 01:51:07', 'pending'),
(7, 7, 'Trang Mạnh Phúc', '0777508199', 'khu phố 3 - Phường Bình Trị Đông A - Quận Bình Tân', 'manhphuc0503@gmail.com', 3750000.00, '2025-12-20 01:51:14', 'pending'),
(8, NULL, '', '', '', '', 150000.00, '2025-12-20 07:07:15', 'pending'),
(9, 7, '', '', '', '', 3900000.00, '2025-12-20 10:32:20', 'pending');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_item`
--

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE IF NOT EXISTS `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `size_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `size_id` (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `cate_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cate_id` (`cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `cate_id`, `created_at`) VALUES
(1, 'BIG SS LONG TEE', 'cimeng dài', 150000.00, 1, '2025-12-13 00:27:08'),
(2, 'MSS STRIPE LONG TEE', 'Sọc dài nhí xanh S', 23000.00, 1, '2025-12-13 00:27:08'),
(3, 'BSS STRIPE LONG TEE\r\n', 'Offwhite L', 200000.00, 1, '2025-12-13 00:27:08'),
(4, 'LS BOXY LONG TEE (đen)\r\n', 'Long Tee LS đen XS', 800000.00, 1, '2025-12-13 00:27:08'),
(5, 'LS BOXY LONG TEE (trắng)', 'Long Tee LS ngọctrinh XS', 230000.00, 1, '2025-12-13 00:27:08'),
(6, 'KNIT TEE', 'Bee knit M waffle', 400000.00, 1, '2025-12-13 00:27:08'),
(7, 'NINE TEE', 'Mô tả áo thun 07', 700000.00, 1, '2025-12-13 00:27:08'),
(8, 'DOC TEE', 'Mô tả áo thun 08', 500000.00, 1, '2025-12-13 00:27:08'),
(9, 'BALL TEE', 'Mô tả áo thun 09', 800000.00, 1, '2025-12-13 00:27:08'),
(10, 'MID TEE', 'Mô tả áo thun 10', 500000.00, 1, '2025-12-13 00:27:08'),
(11, 'DNA TEE 3D', 'Mô tả áo thun 11', 600000.00, 1, '2025-12-13 00:27:20'),
(12, 'DNA TEE 1D', 'Mô tả áo thun 12', 300000.00, 1, '2025-12-13 00:27:20'),
(13, 'BIG STRIPE SS TEE', 'Mô tả áo thun 13', 250000.00, 1, '2025-12-13 00:27:20'),
(14, 'MOUSE TEE', 'Mô tả áo thun 14', 400000.00, 1, '2025-12-13 00:27:20'),
(15, 'SMI TEE', 'Mô tả áo thun 15', 300000.00, 1, '2025-12-13 00:27:20'),
(16, 'SPIDER BABY/BOXY TEE (xám)', 'Mô tả áo thun 16', 600000.00, 1, '2025-12-13 00:27:20'),
(17, 'SPIDER BABY/BOXY TEE (đen)', 'Mô tả áo thun 17', 650000.00, 1, '2025-12-13 00:27:20'),
(18, 'LOGO POLO (bò)', 'Mô tả áo thun 18', 230000.00, 1, '2025-12-13 00:27:20'),
(19, 'LOGO POLO (trắng)', 'Mô tả áo thun 19', 230000.00, 1, '2025-12-13 00:27:20'),
(20, 'LOGO POLO (đen)', 'Mô tả áo thun 20', 500000.00, 1, '2025-12-13 00:27:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

DROP TABLE IF EXISTS `product_image`;
CREATE TABLE IF NOT EXISTS `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_main` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `path`, `is_main`) VALUES
(21, 1, 'ao_01.webp', 1),
(22, 2, 'ao_02.webp', 1),
(23, 3, 'ao_03.webp', 1),
(24, 4, 'ao_04.webp', 1),
(25, 5, 'ao_05.webp', 1),
(26, 6, 'ao_06.webp', 1),
(27, 7, 'ao_07.webp', 1),
(28, 8, 'ao_08.webp', 1),
(29, 9, 'ao_09.webp', 1),
(30, 10, 'ao_10.webp', 1),
(31, 11, 'ao_11.webp', 1),
(32, 12, 'ao_12.webp', 1),
(33, 13, 'ao_13.webp', 1),
(34, 14, 'ao_14.webp', 1),
(35, 15, 'ao_15.webp', 1),
(36, 16, 'ao_16.webp', 1),
(37, 17, 'ao_17.webp', 1),
(38, 18, 'ao_18.webp', 1),
(39, 19, 'ao_19.webp', 1),
(40, 20, 'ao_20.webp', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_stock`
--

DROP TABLE IF EXISTS `product_stock`;
CREATE TABLE IF NOT EXISTS `product_stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `size_id` int DEFAULT NULL,
  `quantity` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `size_id` (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_stock`
--

INSERT INTO `product_stock` (`id`, `product_id`, `size_id`, `quantity`) VALUES
(1, 6, 3, 20),
(2, 1, 3, 20);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `size`
--

DROP TABLE IF EXISTS `size`;
CREATE TABLE IF NOT EXISTS `size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `size`
--

INSERT INTO `size` (`id`, `name`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'XL');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','customer') COLLATE utf8mb4_unicode_ci DEFAULT 'customer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`) VALUES
(2, 'nv001', '$2y$10$goH.Nc6altcc13A9yXEvIu0ZBWn7YW9XME7OL8vSUyZA5MDNVbOUu', 'customer'),
(4, 'nv002', '$2y$10$AIDOdWlvOhspqo7wCidacOf0aPDgY4jfu5Ou9WuZuuL5W30lQo95i', 'customer'),
(5, 'nv003', '$2y$10$9N8UBenPDdZoLAXQsaee2.cACdMnnSmQ/RuhGNk49Jv50IHuP.nFe', 'customer'),
(6, 'manhphuc', '$2y$10$9.y96LdC7eVX2/xoh7wyCu2v/ZDWLYS25HoNxMihLAUPmLrv949QS', 'customer'),
(7, 'phuc', '$2y$10$0IMl6fnflRgvdR3ij8CTXOSC2EYAtTpaUnMGA3bLogwwxYud.PpNy', 'customer'),
(8, 'quan', '$2b$10$Z5pdN3m63TM8KOLl64SFO.JFQqicO.iwR6wZppgeC.K.sNRvZXA8K', 'customer'),
(9, 'codex_test_5975', '$2b$10$ApYCQw58Uyt23D4riLgo7.Y4QAwsxWUB.EFkw6cQi.XT71j8/KVdi', 'customer');

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ràng buộc cho bảng `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `order_item_ibfk_3` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`);

--
-- Ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `category` (`id`);

--
-- Ràng buộc cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Ràng buộc cho bảng `product_stock`
--
ALTER TABLE `product_stock`
  ADD CONSTRAINT `product_stock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `product_stock_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
