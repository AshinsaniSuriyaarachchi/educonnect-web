package educonnect.v1.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "saved_course")
public class SavedCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int savedCourseId;

    @OneToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
