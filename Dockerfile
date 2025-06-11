# 使用官方 Python 3.11 镜像作为基础
FROM python:3.11

ARG PY_VERSION=3.11
ARG NODE_MAJOR=16

# 设置阿里云 Debian 镜像源，避免国内拉包失败
RUN echo "deb https://mirrors.aliyun.com/debian bookworm main contrib non-free" > /etc/apt/sources.list && \
    echo "deb https://mirrors.aliyun.com/debian bookworm-updates main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb https://mirrors.aliyun.com/debian-security bookworm-security main contrib non-free" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        gpg gpg-agent software-properties-common \
        git gcc libmagic1 libssl-dev libldap2-dev libsasl2-dev \
        libjpeg-dev zlib1g-dev zip subversion curl locales \
        g++ libsvn-dev make sudo ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 设置 Python 可执行变量（供 init-docker-dev.sh 使用）
ENV PYTHON_EXE=python${PY_VERSION}

# 安装 Node.js 16（使用 nodesource 官方安装脚本，更兼容）
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# 设置语言环境
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8

# GitPython 使用 USER 识别用户
ENV USER root

# 设置工作目录
WORKDIR /allura

# 禁用 Python 缓冲（日志实时输出）
ENV PYTHONUNBUFFERED 1

# 默认运行命令：gunicorn 启动 Allura 服务（开发模式）
CMD gunicorn --paste Allura/docker-dev.ini -b :8088 --reload
