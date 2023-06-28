-- MySQL dump 10.13  Distrib 8.0.32, for macos13 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `likedVacations` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'Daniel','Wieder','danielwieder94@gmail.com','$2b$10$07l9.FMgj0o.lN3I5HGYwOjLfrTBZwhjO7oMj937qksE18FE2tcTe',1,NULL),(6,'abu','dabu','abudabu@gmail.com','$2b$10$GUsdEYf6GfSPopR709F.meoaiiOYvJRG45DBSRV.f8lshISWvMjF.',0,'[5, 2, 1, 9, 12, 20, 31, 35, 19, 6, 27]'),(7,'Uri','Friedman','urifriedman@gmail.com','$2b$10$K0WkJnUZDfVGoYFZApYhOe4.cRTitGe09zpZqeu444uafraxEOISa',0,NULL),(8,'user','user','user@user.com','$2b$10$R.NxuGaTJ9kCoFk63gftvOhYoIeWVlq4eQWTSdIvKZRT4NQyBMukS',0,'[6, 25, 19, 31, 28, 27, 20, 2]'),(9,'John','Doe','johndoe@gmail.com','$2b$10$QemuWEjtc8pm14LmlIgCHu6XkPfljejQb7b3AQGgAQujJ.bxvP0kW',0,NULL),(10,'Moshe','Moshe','moshemoshe@gmail.com','$2b$10$6cBnmq9IqqmaOpglMp.Z.OfhDh5/l6NSHHooAoQ6AiqOBA36jrNu.',0,'[19, 1, 2, 6, 31]'),(12,'dada','dada','dada@gmail.com','$2b$10$JbHMWo6VzaDQzOZCe8EVYuK4/4Ein1JbX1P5fJ3Xqdj0ajrm7rJzu',0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations_list`
--

DROP TABLE IF EXISTS `vacations_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(255) NOT NULL,
  `vacDesc` varchar(1020) NOT NULL,
  `vacImg` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `vacPrice` int NOT NULL,
  `likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations_list`
--

LOCK TABLES `vacations_list` WRITE;
/*!40000 ALTER TABLE `vacations_list` DISABLE KEYS */;
INSERT INTO `vacations_list` VALUES (1,'Maldives','The Maldives is a tropical paradise located in the Indian Ocean, known for its crystal-clear waters, pristine beaches, and luxurious resorts. It is a perfect destination for relaxation, water sports, and diving, with plenty of opportunities to explore the local culture and cuisine.','maldives.jpg','2023-06-05','2023-06-22',3250,3),(2,'Rome','Rome, the eternal city, is a must-visit destination for history and art lovers. From ancient ruins and world-famous landmarks like the Colosseum and the Vatican to trendy neighborhoods and delicious Italian food, Rome offers a unique mix of old and new, tradition and modernity.','rome.jpg','2023-06-05','2023-07-05',1800,3),(5,'Tokyo','Tokyo, the capital of Japan, is a bustling and vibrant metropolis with a unique blend of tradition and modernity. From the historic temples and shrines to the futuristic skyscrapers and neon lights, Tokyo offers a fascinating insight into Japanese culture and way of life. And with its world-famous cuisine, shopping, and entertainment, Tokyo is a perfect destination for urban explorers and foodies.','tokyo.jpg','2023-06-18','2023-07-12',3400,1),(6,'Amsterdam','Amsterdam is the capital city of the Netherlands, famous for its picturesque canals, museums, and coffee shops. Visitors can take a boat tour along the canals, visit world-renowned museums such as the Rijksmuseum and Van Gogh Museum, or explore the vibrant nightlife in the city\'s many bars and clubs.','amsterdam.jpg','2023-07-13','2023-07-18',1800,3),(9,'Paris','Experience the magic of Paris with a vacation filled with romance, culture and adventure. Take a stroll along the Seine River, climb the Eiffel Tower and visit world-famous museums such as the Louvre and Musée d\'Orsay. Indulge in exquisite French cuisine at local bistros and cafes, and shop for high fashion in the city\'s chic boutiques. End your day with a glass of wine while enjoying the spectacular view of the city\'s skyline.','paris.jpg','2023-08-09','2023-08-28',2900,1),(16,'Panama',' Immerse yourself in the lush beauty of Panama, where azure waters meet pristine white-sand beaches. Explore the vibrant rainforests, encounter diverse wildlife, and discover the awe-inspiring Panama Canal, a marvel of engineering. Indulge in thrilling water sports, soak up the sun on picturesque islands, and experience the rich cultural heritage of this captivating Central American gem.','panama.jpg','2023-07-19','2023-07-30',2900,0),(19,'Santorini','Discover the mesmerizing beauty of Santorini, a Greek island paradise nestled in the Aegean Sea. Lose yourself in the enchanting charm of its iconic whitewashed buildings, perched on dramatic cliffs overlooking the sparkling blue waters. Explore the narrow winding streets, indulge in exquisite local wines, and witness breathtaking sunsets that paint the sky with vibrant hues. With its stunning beaches, ancient ruins, and unparalleled views, Santorini is a dream destination for any traveler.','santorini.jpg','2023-06-18','2023-07-02',2650,3),(20,'Barcelona','Barcelona, the capital of Catalonia, is a vibrant and cosmopolitan city with a rich history and culture. From Gaudís stunning architecture and the Gothic Quarter\'s narrow streets to the lively beaches and tapas bars, Barcelona is a perfect destination for sightseeing, shopping, and partying.','barcelona.jpg','2023-06-16','2023-06-30',2950,2),(23,'Hanoi','Discover the enchanting city of Hanoi, the cultural heart of Vietnam. Explore the narrow streets of the Old Quarter, taste the delicious local street food, and experience the tranquility of Hoan Kiem Lake. Visit the historic Ho Chi Minh Mausoleum, wander through the vibrant markets, and take a cyclo ride through the bustling streets. Immerse yourself in Vietnamese history and culture at the Temple of Literature and witness the mesmerizing water puppet shows. Hanoi offers a fascinating blend of ancient traditions and modern influences, making it a captivating destination for a vacation.','hanoi.jpg','2023-06-27','2023-07-27',2000,0),(24,'Cancun','Escape to the pristine beaches of Cancun, Mexico\'s famous resort city. Relax on the soft white sands, swim in the crystal-clear turquoise waters, and indulge in luxurious beachfront resorts. Explore the fascinating Mayan ruins of Tulum, snorkel in the vibrant coral reefs of the Great Maya Reef, and take a dip in the stunning natural sinkholes known as cenotes. Experience the vibrant nightlife of Cancun\'s Hotel Zone, enjoy water sports and adventure activities, and savor the flavors of authentic Mexican cuisine. With its breathtaking natural beauty and endless entertainment options, Cancun offers a tropical paradise for a memorable vacation.','cancun.jpg','2023-07-29','2023-08-30',3500,0),(25,'Seoul','Experience a captivating vacation in Seoul, South Korea\'s bustling capital. Dive into the vibrant street markets of Myeongdong, feast on delicious Korean cuisine, and immerse yourself in the city\'s fascinating blend of tradition and modernity. Visit historic palaces like Gyeongbokgung, stroll along the trendy streets of Gangnam, and explore the vibrant nightlife of Hongdae. With its unique blend of ancient history and cutting-edge technology, Seoul offers an exciting and dynamic vacation destination.','seuol.jpg','2023-06-30','2023-07-31',3200,1),(27,'Las Vegas','Enter a world of glitz and glamour on a vacation to Las Vegas, the entertainment capital of the world. Experience the dazzling lights of the famous Las Vegas Strip, catch a spectacular live show, and try your luck at the glamorous casinos. Indulge in world-class dining, relax by luxurious pools, and explore iconic landmarks like the Bellagio Fountains and the replica of the Eiffel Tower. With its endless entertainment options and non-stop excitement, Las Vegas promises an exhilarating vacation experience.','lasvegas.jpg','2023-08-01','2023-08-30',4000,2),(28,'Buenos Aires','Embark on a captivating vacation in Buenos Aires, the vibrant capital of Argentina. Immerse yourself in the passionate world of tango, wander through the colorful neighborhoods of La Boca and San Telmo, and marvel at the stunning architecture of Recoleta Cemetery. Indulge in the city\'s culinary delights, from sizzling steaks to delectable empanadas, and experience the electric energy of a live football match. Buenos Aires entices visitors with its rich cultural heritage, cosmopolitan atmosphere, and a unique blend of European and Latin American influences.','buenos.jpg','2023-07-24','2023-08-22',2750,1),(31,'Brazil','A thrilling vacation in Brazil! discover the vibrant city of Rio de Janeiro, known for its iconic beaches, samba rhythm, and awe-inspiring landmarks like Christ the Redeemer. Immerse yourself in the rich cultural heritage of Salvador, explore the magnificent Amazon rainforest, or indulge in the breathtaking beauty of Iguazu Falls. With its diverse landscapes and lively atmosphere, Brazil offers an unforgettable vacation experience.','brazil.jpg','2023-07-26','2023-08-16',2250,3),(35,'Hawaii','Unwind and embrace the natural beauty of Hawaii on a dreamy vacation. Bask in the warm sun on pristine white-sand beaches, snorkel in crystal-clear waters teeming with marine life, and hike through lush rainforests to discover breathtaking waterfalls. Immerse yourself in Hawaiian culture with traditional luaus, explore volcanic landscapes in Hawaii Volcanoes National Park, and witness the mesmerizing sunset views from atop Haleakala. With its tranquil ambiance, stunning landscapes, and welcoming aloha spirit, Hawaii is a paradise that offers the perfect escape from everyday life.','hawaii.jpg','2023-07-28','2023-08-28',6250,1);
/*!40000 ALTER TABLE `vacations_list` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vacationId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`,`vacationId`),
  KEY `likes_ibfk_2` (`vacationId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=262 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (209,1,6),(208,2,6),(207,5,6),(245,6,6),(215,9,6),(243,19,6),(218,20,6),(261,27,6),(221,31,6),(223,35,6),(213,1,8),(242,2,8),(212,5,8),(225,6,8),(228,19,8),(236,20,8),(226,25,8),(231,27,8),(230,28,8),(229,31,8),(237,1,10),(239,2,10),(240,6,10),(232,19,10),(241,31,10);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-28 12:07:19
