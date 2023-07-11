package server;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

/**
 * Server for the ART web front end.
 */
public class ARTServer {

    final static String JERSEY_CONTEXT_PATH = "/api";
    final static String JERSEY_PACKAGE = "controllers";
    final static String RESOURCES_CONTEXT_PATH = "/"; 
    final static String RESOURCES_DIRECTORY = Resources.getStaticResourcesDir();
    
    // attributes for the server configuration
    private int port;

    // attribute for storing the Jetty Server instance
    private Server server;


    /**
     * Constructs a WebART object.
     * 
     * @param port the port that the server should use
     */
    public ARTServer(int port) {

        // store the server settings
        this.port = port;

        // create the server
        this.server = createServer();
    }


    /**
     * Creates the Jetty Server object.
     * 
     * @return the Jetty Server object
     */
    private Server createServer() {
        // create the server
        Server server = new Server(this.port);
        // create the handlers and add them to the server
        ContextHandlerCollection contexts = new ContextHandlerCollection();
        Handler[] handlers = new Handler[] {
            this.createJerseyHandler(), 
            this.createResourceHandler()
        };
        contexts.setHandlers(handlers);
        server.setHandler(contexts);
        return server;
    }


    /**
     * Creates the configuration for the Jersey servlet.
     * 
     * @return the resource configuration for the Jersey servlet
     */
    private ResourceConfig createResourceConfig() {
        // create the resource config from the controllers package
        ResourceConfig config = new ResourceConfig();
        config.packages(JERSEY_PACKAGE); // package containing HTTP request handlers
        config.register(MultiPartFeature.class); // allows multi-part forms
        return config;
    }

    /**
     * Creates the servlet that runs Jersey.
     * 
     * @return the Jersey servlet
     */
    private ServletHolder createServlet() {
        ResourceConfig config = this.createResourceConfig();
        ServletContainer container = new ServletContainer(config);
        ServletHolder servlet = new ServletHolder(container);
        return servlet;
    }

    /**
     * Creates the Jersey handler.
     * 
     * @return the Context Handler that handles requests made to the Jersey context path
     */
    private ContextHandler createJerseyHandler() {
        // create the context handler
        ServletContextHandler context = new ServletContextHandler();
        context.setContextPath(JERSEY_CONTEXT_PATH);
        // add the Jersey servlet to the context handler
        ServletHolder jerseyServlet = this.createServlet();
        context.addServlet(jerseyServlet, "/*");
        return context;
    }

    /**
     * Creates the context handler for serving the resources.
     * 
     * @return the resources context handler
     */
    private ContextHandler createResourceHandler() {
        // Create the resource handler and set the location of the resources
        ResourceHandler resourceHandler= new ResourceHandler();
        resourceHandler.setResourceBase(RESOURCES_DIRECTORY);
        // create the context handler for the resources context path
        ContextHandler contextHandler = new ContextHandler(RESOURCES_CONTEXT_PATH);
        // set the resource handler to be the context handler
        contextHandler.setHandler(resourceHandler);
        return contextHandler;
    }









    /**
     * Starts the server.
     * 
     * @throws Exception if the server errors
     */
    public void start() throws Exception {
        this.server.start(); // starts the server
        System.out.println("Server successfully started");
        this.server.join(); // leaves server running until process ends
    }

}
