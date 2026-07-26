import os
import re

directory = r"c:\Users\Hp\Documents\workspace-spring-tools-for-eclipse-5.2.0.RELEASE\adaptive_course_backend\src\main\java\com\example\demo\service\serviceimple"

for filename in os.listdir(directory):
    if filename.endswith(".java"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        
        # Replace 'not found' exceptions with ResourceNotFoundException
        content = re.sub(r'new RuntimeException\("([^"]*not found[^"]*)"\)', r'new ResourceNotFoundException("\1")', content, flags=re.IGNORECASE)
        
        # Replace remaining RuntimeExceptions with ApiException
        content = content.replace('new RuntimeException(', 'new ApiException(')

        # Add imports if changed
        if content != original_content:
            imports_to_add = []
            if "new ApiException" in content and "import com.example.demo.exception.ApiException;" not in content:
                imports_to_add.append("import com.example.demo.exception.ApiException;")
            if "new ResourceNotFoundException" in content and "import com.example.demo.exception.ResourceNotFoundException;" not in content:
                imports_to_add.append("import com.example.demo.exception.ResourceNotFoundException;")
            
            if imports_to_add:
                content = re.sub(r'^(package [^;]*;)', r'\1\n\n' + '\n'.join(imports_to_add), content, count=1, flags=re.MULTILINE)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Done replacing exceptions")
