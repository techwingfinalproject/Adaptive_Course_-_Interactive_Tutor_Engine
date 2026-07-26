package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")   // 👈 Add this line
class AdaptiveCourseBackendApplicationTests {

    @Test
    void contextLoads() {
        // This method is intentionally empty. It tests if the application context loads successfully.
    }
}
