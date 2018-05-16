import com.maintain.LnInstrumentApp;
import com.labnetwork.intrument.category.CategoryService;
import com.maintain.utils.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = LnInstrumentApp.class)
@Slf4j
public class CategoryTest {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private JsonUtil jsonUtil;

    @Test
    public void test() throws InterruptedException {
        log.info("CategoryCascaderResponse result: {}", jsonUtil.toJSONStringFormat(categoryService.getCategoryCascader()));
    }
}
