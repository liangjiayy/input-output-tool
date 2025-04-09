<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const features = ref([
  {
    title: '多样化输入处理',
    description: '支持多种输入格式，轻松处理文本、JSON、CSV等数据',
    icon: 'el-icon-document'
  },
  {
    title: '自定义处理链',
    description: '通过可视化界面创建和管理数据处理流程，无需编写复杂代码',
    icon: 'el-icon-connection'
  },
  {
    title: '实时预览',
    description: '即时查看处理结果，快速调整参数和流程',
    icon: 'el-icon-view'
  },
  {
    title: '模块化设计',
    description: '保存和复用常用处理流程，提高工作效率',
    icon: 'el-icon-files'
  }
]);

const goToApp = () => {
  router.push('/input-output');
};
</script>

<template>
  <main class="home-container">
    <section class="hero">
      <div class="hero-content">
        <h1>输入输出处理工具</h1>
        <p class="subtitle">简化数据处理流程，提高工作效率</p>
        <el-button type="primary" size="large" @click="goToApp">开始使用</el-button>
      </div>
    </section>

    <section class="features">
      <h2>主要功能</h2>
      <div class="feature-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <div class="feature-icon">
            <i :class="feature.icon"></i>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <h2>如何使用</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>添加输入</h3>
            <p>在输入区域添加您需要处理的数据</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>配置处理链</h3>
            <p>添加和配置处理函数，构建数据处理流程</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>查看输出</h3>
            <p>实时查看处理结果，根据需要调整处理流程</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>立即体验</h2>
      <p>开始使用我们的输入输出处理工具，简化您的数据处理工作</p>
      <el-button type="primary" size="large" @click="goToApp">开始使用</el-button>
    </section>
  </main>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  background: linear-gradient(135deg, #409EFF 0%, #007BFF 100%);
  color: white;
  border-radius: 8px;
  padding: 60px 40px;
  margin-bottom: 40px;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
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

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
  color: #409EFF;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.step-number {
  background: #409EFF;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h3 {
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.cta {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 50px;
  text-align: center;
}

.cta p {
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .step {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
