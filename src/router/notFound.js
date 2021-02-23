import NotFoundComponent from '@/components/notFound'
import Layout from "@/views/layout";

export default {
  path: "*",
  component: Layout,
  children: [{
    path:'*',
    component: NotFoundComponent,
  }]
}
