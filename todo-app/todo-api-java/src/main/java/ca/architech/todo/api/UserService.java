package ca.architech.todo.api;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@ConfigurationProperties("api.user")
public class UserService {
    private String baseUrl;

    private RestTemplate restTemplate;
    private static final Log logger;

    static {
        logger = LogFactory.getLog(UserService.class);
    }

    public UserService() {
        restTemplate = new RestTemplate();
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public User findUserByEmail(String email) {
        logger.info(String.format("Querying the user API for a user with an email of %s", email));

        String requestUrl = String.format("%s/api/user/%s", baseUrl, email);
        ResponseEntity<User> response = restTemplate.getForEntity(requestUrl, User.class);
        User matchingUser = response.getBody();

        logger.info(String.format("User API query result: %s", matchingUser));
        return matchingUser;
    }
}
