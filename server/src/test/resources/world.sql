-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Linux (x86_64)
--
-- Host: faure    Database: cs314
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `world`
--

DROP TABLE IF EXISTS `world`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `world` (
  `index` int(11) NOT NULL,
  `id` varchar(30) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `latitude` varchar(1000) DEFAULT NULL,
  `longitude` varchar(1000) DEFAULT NULL,
  `altitude` varchar(1000) DEFAULT NULL,
  `continent` varchar(1000) DEFAULT NULL,
  `iso_country` varchar(1000) DEFAULT NULL,
  `iso_region` varchar(1000) DEFAULT NULL,
  `municipality` varchar(1000) DEFAULT NULL,
  `scheduled_service` varchar(1000) DEFAULT NULL,
  `gps_code` varchar(1000) DEFAULT NULL,
  `iata_code` varchar(1000) DEFAULT NULL,
  `local_code` varchar(1000) DEFAULT NULL,
  `home_link` varchar(1000) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `airports_name_idx` (`name`),
  FULLTEXT KEY `airpots_municipality_idx` (`municipality`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `world`
--
-- WHERE:  municipality='Louisville'

LOCK TABLES `world` WRITE;
/*!40000 ALTER TABLE `world` DISABLE KEYS */;
INSERT INTO `world` VALUES (6934,'07KY','small_airport','Blue Lick Airport','38.08060073852539','-85.69329833984375','532','NA','US','US-KY','Louisville','no','07KY',NULL,'07KY',NULL,NULL,NULL),(7033,'09KY','heliport','Baptist Hospital East Heliport','38.23899841308594','-85.63939666748047','531','NA','US','US-KY','Louisville','no','09KY',NULL,'09KY',NULL,NULL,NULL),(7138,'0CO1','small_airport','Dave\'s Airport','40.0332984924','-105.124000549','5170','NA','US','US-CO','Louisville','no','0CO1',NULL,'0CO1',NULL,NULL,NULL),(7668,'10KY','heliport','Southwest Government Center Heliport','38.148399353027344','-85.83689880371094','480','NA','US','US-KY','Louisville','no','10KY',NULL,'10KY',NULL,NULL,NULL),(7717,'11KY','heliport','Southwest Hospital Heliport','38.11589813232422','-85.83609771728516','500','NA','US','US-KY','Louisville','no','11KY',NULL,'11KY',NULL,NULL,NULL),(8399,'1KY5','heliport','Switch Pad Heliport','38.16669845581055','-85.70130157470703','496','NA','US','US-KY','Louisville','no','1KY5',NULL,'1KY5',NULL,NULL,NULL),(45428,'1KY8','heliport','Norton Audubon Hospital Heliport','38.214444','-85.7225','517','NA','US','US-KY','Louisville','no','1KY8',NULL,'1KY8',NULL,NULL,NULL),(8573,'1OA7','small_airport','Yoder Airport','40.84170150756836','-81.24150085449219','1149','NA','US','US-OH','Louisville','no','1OA7',NULL,'1OA7',NULL,NULL,NULL),(8678,'1TN1','heliport','Clayton Heliport','35.864498138427734','-83.9573974609375','900','NA','US','US-TN','Louisville','no','1TN1',NULL,'1TN1',NULL,NULL,NULL),(8892,'22KY','heliport','Churchill Downs Heliport','38.20280075073242','-85.76969909667969','455','NA','US','US-KY','Louisville','no','22KY',NULL,'22KY',NULL,NULL,NULL),(9022,'24OH','small_airport','Milburn Airport','40.88059997558594','-81.29149627685547','1197','NA','US','US-OH','Louisville','no','24OH',NULL,'24OH',NULL,NULL,NULL),(9073,'25OH','small_airport','Hammond Airport','40.91310119628906','-81.25980377197266','1050','NA','US','US-OH','Louisville','no','25OH',NULL,'25OH',NULL,NULL,NULL),(9105,'26KY','heliport','University Hospital Heliport','38.24760055541992','-85.74330139160156','465','NA','US','US-KY','Louisville','no','26KY',NULL,'26KY',NULL,NULL,NULL),(9120,'26OH','small_airport','Hitz Airport','40.875301361083984','-81.29509735107422','1180','NA','US','US-OH','Louisville','no','26OH',NULL,'26OH',NULL,NULL,NULL),(10959,'41KY','heliport','Jewish Hospital Heliport','38.25199890136719','-85.75050354003906','440','NA','US','US-KY','Louisville','no','41KY',NULL,'41KY',NULL,NULL,NULL),(11039,'43KY','heliport','Wlky-Tv Studios Heliport','38.263099670410156','-85.71019744873047','500','NA','US','US-KY','Louisville','no','43KY',NULL,'43KY',NULL,NULL,NULL),(11101,'44TN','small_airport','Stone Field','35.84090042','-84.07569885','890','NA','US','US-TN','Louisville','no','44TN',NULL,'44TN',NULL,NULL,NULL),(13334,'6KY6','small_airport','Jeffries Farm Airport','38.360599517822266','-85.36309814453125','803','NA','US','US-KY','Louisville','no','6KY6',NULL,'6KY6',NULL,NULL,NULL),(15529,'97KY','heliport','Greener Horizons Heliport','38.243900299072266','-85.48889923095703','745','NA','US','US-KY','Louisville','no','97KY',NULL,'97KY',NULL,NULL,NULL),(320597,'CA-0638','closed','Louisville/Cascades Heliport','46.259103','-72.9511','36','NA','CA','CA-QC','Louisville','no',NULL,NULL,NULL,NULL,NULL,'CSM7'),(16899,'CO45','heliport','Avista Hospital Heliport','39.95280075073242','-105.1520004272461','5510','NA','US','US-CO','Louisville','no','CO45',NULL,'CO45',NULL,NULL,NULL),(18595,'K2J3','small_airport','Louisville Municipal Airport','32.98649978637695','-82.38569641113281','328','NA','US','US-GA','Louisville','no','K2J3',NULL,'2J3',NULL,NULL,NULL),(20356,'KLMS','small_airport','Louisville Winston County Airport','33.1461982727','-89.0625','575','NA','US','US-MS','Louisville','no','KLMS','LMS','LMS',NULL,NULL,NULL),(3649,'KLOU','medium_airport','Bowman Field','38.2280006409','-85.6636962891','546','NA','US','US-KY','Louisville','no','KLOU','LOU','LOU','http://www.flylouisville.com/bowman-field/fast-facts/','http://en.wikipedia.org/wiki/Bowman_Field_(airport)',NULL),(3873,'KSDF','large_airport','Louisville International Standiford Field','38.1744','-85.736','501','NA','US','US-KY','Louisville','yes','KSDF','SDF','SDF','http://www.flylouisville.com','http://en.wikipedia.org/wiki/Louisville_International_Airport',NULL);
/*!40000 ALTER TABLE `world` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-23 18:38:39
