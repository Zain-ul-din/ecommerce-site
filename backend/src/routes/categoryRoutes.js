// category Router
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  RESPONSE,
  BAD_REQ_RESPONSE,
  PRISMA_ERROR_RESPONSE,
} from "../Helper/utilities.js";
import { HTTP_RESPONSE } from "../Helper/HttpResponse.js";

export const categoryRouter = Router();
const prisma = new PrismaClient();

async function getAll(req, res) {
  const categories = await prisma.category.findMany({});
  res.send(Object.assign(RESPONSE, { data: categories }));
}

// Get by super category
async function getBySuperCategory(req, res) {
  const id = parseInt(req.params.id);
  const category = await prisma.category.findMany({
    where: { superCategory_id: id },
    include: { products: true },
  });
  res.send(
    Object.assign(RESPONSE, {
      status: category.length == 0 ? 404 : 200,
      data: category.length == 0 ? null : category,
    })
  );
}

async function getUnique(req, res) {
  let id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);
  const category = await prisma.category.findMany({
    where: { id: id },
    include: { products: true },
  });
  res.send(
    Object.assign(RESPONSE, {
      status: category.length == 0 ? 404 : 200,
      data: category.length == 0 ? null : category,
    })
  );
}

async function post(req, res) {
  var { category } = req.body;
  category = typeof category !== "object" ? {} : category;
  let error = null;

  const newCategory = await prisma.category
    .create({
      data: {
        name: category.name,
        image: category.image,
        superCategory_id: category.superCategory_id,
        superCategoryName: category.superCategoryName,
        products: { create: [] },
      },
    })
    .catch((err) => (error = err));

  if (error)
    res.send(
      Object.assign(BAD_REQ_RESPONSE, { error: PRISMA_ERROR_RESPONSE(error) })
    );
  else
    res.send(
      Object.assign(RESPONSE, {
        data: newCategory,
        status: HTTP_RESPONSE.created,
      })
    );
}

async function deleteUnique(req, res) {
  const id = parseInt(req.params.id);
  let error = null;

  await prisma.category
    .delete({ where: { id: id } })
    .catch((err) => (error = err));

  if (error)
    res.send(
      Object.assign(BAD_REQ_RESPONSE, { error: PRISMA_ERROR_RESPONSE(error) })
    );
  else res.send(Object.assign(RESPONSE, { data: {} }));
}

async function updateUnique(req, res) {
  var { category } = req.body;
  category = typeof category !== "object" ? {} : category;
  const id = parseInt(req.params.id);
  let error = null;
  // category_id
  const updatedCategory = await prisma.category
    .update({
      where: { id: id },
      data: {
        name: category.name,
        image: category.image,
      },
    })
    .catch((err) => (error = err));

  if (error)
    res.send(
      Object.assign(BAD_REQ_RESPONSE, { error: PRISMA_ERROR_RESPONSE(error) })
    );
  else res.send(Object.assign(RESPONSE, { data: updatedCategory }));
}

categoryRouter
  .get("/", getAll)
  .get("/:id", getUnique)
  .get("/super/:id", getBySuperCategory)
  .post("/", post)
  .delete("/:id", deleteUnique)
  .put("/:id", updateUnique);
