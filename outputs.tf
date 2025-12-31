output "controller_ip" {
  value = aws_instance.ansible_controller.public_ip
}

output "web_server_ips" {
  value = aws_instance.web_server[*].public_ip
}

output "web_server_private_ips" {
  value = aws_instance.web_server[*].private_ip
}

output "load_balancer_url" {
  value = aws_lb.web.dns_name
}
