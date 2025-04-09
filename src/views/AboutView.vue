<script setup>
import { ref } from 'vue';

const teamMembers = ref([
  // {
  //   name: '张三',
  //   role: '项目负责人',
  //   description: '拥有10年软件开发经验，专注于数据处理和可视化工具开发。'
  // },
  // {
  //   name: '李四',
  //   role: '前端开发',
  //   description: 'Vue.js专家，负责用户界面设计和交互体验优化。'
  // },
  // {
  //   name: '王五',
  //   role: '后端开发',
  //   description: '数据处理算法专家，设计了核心的数据转换引擎。'
  // }
]);

const faqs = ref([
  {
    question: '这个工具适合什么场景使用？',
    answer: '本工具适合需要对文本、JSON、CSV等数据进行转换、过滤、格式化等操作的场景。特别适合数据分析师、开发人员和内容编辑等工作。'
  },
  {
    question: '如何保存我的处理流程？',
    answer: '您可以在处理链页面点击"更多"按钮，然后选择"保存当前模块"，输入名称后即可保存。下次使用时可以从同一菜单加载已保存的模块。'
  },
  {
    question: '是否支持自定义处理函数？',
    answer: '是的，您可以在处理链中添加自定义JavaScript函数，实现特定的数据处理需求。我们提供了函数模板和示例，方便您快速上手。'
  },
  {
    question: '数据是否会上传到服务器？',
    answer: '不会。所有数据处理都在您的浏览器本地完成，不会上传到任何服务器。您的数据安全完全由您自己控制。'
  }
]);
</script>

<template>
  <main class="about-container">
    <section class="about-header">
      <h1>关于我们</h1>
      <p class="about-description">
        输入输出处理工具是一个专为简化数据处理流程而设计的Web应用。
        我们的目标是让用户能够通过简单直观的界面，快速构建复杂的数据处理流程，
        无需编写大量代码，提高工作效率。
      </p>
    </section>

    <section class="mission">
      <h2>我们的使命</h2>
      <div class="mission-content">
        <div class="mission-image">
          <img src="@/assets/mission.svg" alt="使命" onerror="this.style.display='none'">
        </div>
        <div class="mission-text">
          <p>
            我们致力于为用户提供简单易用、功能强大的数据处理工具，
            帮助用户快速完成数据转换、清洗和分析等任务。
            通过可视化的界面和模块化的设计，让数据处理变得简单而高效。
          </p>
          <p>
            我们相信，技术应该服务于人，而不是让人适应技术。
            因此，我们不断优化用户体验，让工具更加直观、易用，
            使用户能够专注于数据本身，而不是工具的使用方法。
          </p>
        </div>
      </div>
    </section>

    <section class="team">
      <h2>团队成员</h2>
      <div class="team-grid">
        <div v-for="(member, index) in teamMembers" :key="index" class="team-card">
          <div class="member-avatar">
            <span>{{ member.name.charAt(0) }}</span>
          </div>
          <h3>{{ member.name }}</h3>
          <div class="member-role">{{ member.role }}</div>
          <p>{{ member.description }}</p>
        </div>
      </div>
    </section>

    <section class="faq">
      <h2>常见问题</h2>
      <el-collapse>
        <el-collapse-item v-for="(item, index) in faqs" :key="index" :title="item.question">
          <p>{{ item.answer }}</p>
        </el-collapse-item>
      </el-collapse>
    </section>

    <section class="contact">
      <h2>联系我们</h2>
      <p>如果您有任何问题、建议或合作意向，请通过以下方式联系我们：</p>
      <div class="contact-info">
        <div class="contact-item">
          <i class="el-icon-message"></i>
          <span>邮箱：contact@example.com</span>
        </div>
        <div class="contact-item">
          <i class="el-icon-phone"></i>
          <span>电话：123-456-7890</span>
        </div>
        <div class="contact-item">
          <i class="el-icon-location"></i>
          <span>地址：中国西安市雁塔区XX路XX号</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.about-header {
  text-align: center;
  margin-bottom: 60px;
}

.about-header h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.about-description {
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: #666;
}

section {
  margin-bottom: 60px;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 1.8rem;
  color: #333;
}

.mission-content {
  display: flex;
  align-items: center;
  gap: 40px;
}

.mission-image {
  flex: 1;
  text-align: center;
}

.mission-image img {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}

.mission-text {
  flex: 2;
}

.mission-text p {
  margin-bottom: 20px;
  line-height: 1.6;
  color: #555;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.team-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 20px;
}

.team-card h3 {
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.member-role {
  color: #409EFF;
  font-weight: 500;
  margin-bottom: 15px;
}

.faq {
  max-width: 800px;
  margin: 0 auto;
}

.contact {
  text-align: center;
}

.contact p {
  margin-bottom: 30px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.contact-item i {
  color: #409EFF;
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .mission-content {
    flex-direction: column;
  }

  .mission-image {
    margin-bottom: 20px;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
