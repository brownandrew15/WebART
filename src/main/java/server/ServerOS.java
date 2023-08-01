package server;

/**
 * Returns details about the server operating system.
 */
public class ServerOS {
 
    // stores the operating system name from the system properties
    private static String OS = System.getProperty("os.name").toLowerCase();
  
    /**
     * Returns if the operating system is Windows.
     * 
     * @return True if the OS is Windows, False otherwise
     */
    public static boolean isWindows() {
        return OS.contains("win");
    }

    /**
     * Returns if the operating system is MacOS.
     * 
     * @return True if the OS is MacOS, False otherwise
     */
    public static boolean isMac() {
        return OS.contains("mac");
    }
 
    /**
     * Returns if the operating system is Unix based.
     * 
     * @return True if the OS is Unix based, False otherwise
     */
    public static boolean isUnix() {
        return (OS.contains("nix") || OS.contains("nux") || OS.contains("aix"));
    }
 
    /**
     * Returns if the operating system is Solaris.
     * 
     * @return True if the OS is Solaris, False otherwise
     */
    public static boolean isSolaris() {
        return OS.contains("sunos");
    }

    /**
     * Returns a String containing the operating system name.
     * The return values are "Windows", "MacOS", "Unix" or "Solaris".
     * 
     * @return the operating system name, or "Unknown" if the operating system could not be determined.
     */
    public static String getOS(){
        if (isWindows()) {
            return "Windows";
        } else if (isMac()) {
            return "MacOS";
        } else if (isUnix()) {
            return "Unix";
        } else if (isSolaris()) {
            return "Solaris";
        } else {
            return "Unknown";
        }
    }
    
}