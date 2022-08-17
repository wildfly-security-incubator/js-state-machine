/*
 * JBoss, Home of Professional Open Source
 * Copyright 2018, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.jboss.quickstarts.jaxrsjwt.rs;

import java.util.logging.Logger;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;



@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TestRest {

    private static final Logger log = Logger.getLogger(TestRest.class.getName());
    private final String CONFIG_FILE_PATH = "standalone/configuration/admin_console_config.json";
    //Security constraints are defined in web.xml

    @GET
    @Path("/public")
    public String getPublicJSON() {
        return "{\"path\":\"public\",\"result\":" + "anonymous" + "}";
    }

    @GET
    @Path("/default")
    public Response getDefaultInput() {
       JSONParser parser = new JSONParser();
       try (FileReader reader = new FileReader(CONFIG_FILE_PATH)){
           JSONObject configFile = (JSONObject) parser.parse(reader);
           Object defaultInput = configFile.get("DEFAULT");
        return Response.ok(defaultInput.toString()).build();
       } catch (Exception e) {
            return Response.status(500).build();
       }
    }

   @GET
   @Path("/username/{username}")
   public Response getFields(@PathParam("username") String username) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader(CONFIG_FILE_PATH)){
            JSONObject configFile = (JSONObject) parser.parse(reader);
            Object user = configFile.get(username);
            return Response.ok(user.toString()).build();
        } catch (Exception e) {
            return Response.status(500).build();
        }
   }

    @POST @Consumes("application/json")
    @Path("/login/{username}")
    public Response submitLogin(@PathParam("username") String username, String body) {
        // make request to login endpoint in elytron with body and username
        return Response.status(500, "Not implemented").build();
    }

}
