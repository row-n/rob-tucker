<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'dev_robtucker-wp');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'N&V@,/R`[W_u *I 62<OM(-Rk`bX}p+XnuB54Wh[~p,Yt&;*I%e&-6G7}c?HB>!{');
define('SECURE_AUTH_KEY',  'uB<-gaf1xKsy=U23G]T1nzn/zVop!F(gS$I$f25v4CtICdS:Tpifw=,2N|eRzik_');
define('LOGGED_IN_KEY',    'ot(5LkXKs>`&[#t~;DOUhb~Q40<Qdxl<-(-r~Iv?&U@AGy=-8j]o).n?x^IYl{!j');
define('NONCE_KEY',        'eA17HU(@.u,.xmwW&*83Ib>A,U/rIp%+4o:UJ-c5ro~(>jktm!TZ/; ?/>XQ8tG=');
define('AUTH_SALT',        'VUzL5N~;?EUzC||J9l*N7z|o.oiD#^JiRxM{F=g3_6biXnJ^*20Rc@c.mL[c~<,j');
define('SECURE_AUTH_SALT', 'KI^-|AqD yXH?B@F[Tu|S(qEA.+IXV}D` ,7]|Vy*Xge1|oIXw+]Ddsf9RfYxA%|');
define('LOGGED_IN_SALT',   'M_=HG#&2CRATW^lK_D}{eP6&1?~p#1:#^XZDAD)n#gPTGV7sH {La_a^JxiD+`O3');
define('NONCE_SALT',       'R>z-1la( A[A&B<B/#$r%5zYSS|,U,]e!BB,PovEdDg.c*xFy~+2Fscu{h37,(+F');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
