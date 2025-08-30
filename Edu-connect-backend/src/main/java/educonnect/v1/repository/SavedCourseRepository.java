package educonnect.v1.repository;

import educonnect.v1.entity.SavedCourse;
import educonnect.v1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedCourseRepository extends JpaRepository<SavedCourse, Integer> {

    @Query("SELECT c FROM SavedCourse c WHERE c.user = :user AND c.course.isDeleted = 'N'")
    List<SavedCourse> findSavedCourseByUser(@Param("user") User user);
}
